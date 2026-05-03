import {
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  PlayCircle,
  Timer,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import RestTimer from '@/components/RestTimer';
import { getTreinoById } from '@/data/treinos';
import { formatDescanso } from '@/lib/format';
import {
  generateSessionId,
  getLastCargaForExercise,
  getRestTimer,
  saveSession,
} from '@/lib/storage';
import { getThumbnail } from '@/lib/youtube';
import type { Exercise, ExerciseSession } from '@/types';

interface Props {
  treinoId: 'A' | 'B' | 'C';
  onBack: () => void;
}

export default function TreinoDetailPage({ treinoId, onBack }: Props) {
  const treino = getTreinoById(treinoId);
  const [openTip, setOpenTip] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const ultimasCargas = useMemo(() => {
    if (!treino) return {} as Record<string, number | null>;
    const map: Record<string, number | null> = {};
    for (const ex of treino.exercicios) {
      map[ex.id] = getLastCargaForExercise(ex.id);
    }
    return map;
  }, [treino]);

  const [logs, setLogs] = useState<Record<string, ExerciseSession>>(() => {
    if (!treino) return {};
    const init: Record<string, ExerciseSession> = {};
    for (const ex of treino.exercicios) {
      init[ex.id] = {
        exerciseId: ex.id,
        sets: [],
      };
    }
    return init;
  });

  if (!treino) {
    return (
      <div className="pb-24">
        <PageHeader title="Treino não encontrado" onBack={onBack} />
      </div>
    );
  }

  function updateLog(
    exerciseId: string,
    field: 'cargaUsada' | 'repsFeitas',
    value: number | undefined,
  ) {
    setLogs((prev) => ({
      ...prev,
      [exerciseId]: { ...prev[exerciseId], [field]: value },
    }));
  }

  function handleSalvar() {
    if (!treino) return;
    const exerciciosLog = Object.values(logs).filter(
      (l) =>
        typeof l.cargaUsada === 'number' || typeof l.repsFeitas === 'number',
    );
    if (exerciciosLog.length === 0) {
      alert('Registre pelo menos um exercício antes de salvar.');
      return;
    }
    saveSession({
      id: generateSessionId(),
      treinoId: treino.id,
      data: new Date().toISOString(),
      exercicios: exerciciosLog,
    });
    setSavedFlash(true);
    setTimeout(() => {
      setSavedFlash(false);
      onBack();
    }, 900);
  }

  function handleAbrirTimer(descansoSeg?: number) {
    const fallback = getRestTimer();
    setTimerSeconds(descansoSeg ?? fallback);
  }

  return (
    <div className="pb-24">
      <PageHeader
        title={treino.nome}
        subtitle={`${treino.foco} · ${treino.exercicios.length} exercícios`}
        onBack={onBack}
      />

      <div className="px-5 space-y-3">
        {treino.exercicios.map((ex, idx) => (
          <ExerciseCard
            key={ex.id}
            index={idx + 1}
            exercise={ex}
            ultimaCarga={ultimasCargas[ex.id]}
            log={logs[ex.id]}
            tipOpen={openTip === ex.id}
            onToggleTip={() =>
              setOpenTip((cur) => (cur === ex.id ? null : ex.id))
            }
            onChangeCarga={(v) => updateLog(ex.id, 'cargaUsada', v)}
            onChangeReps={(v) => updateLog(ex.id, 'repsFeitas', v)}
            onAbrirTimer={() => handleAbrirTimer(ex.descansoSeg)}
          />
        ))}
      </div>

      <div className="px-5 mt-6 flex gap-3">
        <button
          onClick={handleSalvar}
          disabled={savedFlash}
          className={`flex-1 py-4 rounded-full font-bold text-bg transition ${
            savedFlash ? 'bg-green-400' : 'bg-accent active:scale-[0.99]'
          }`}
        >
          {savedFlash ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={20} /> Salvo!
            </span>
          ) : (
            'Salvar sessão'
          )}
        </button>
        <button
          onClick={() => handleAbrirTimer()}
          className="px-5 py-4 rounded-full font-semibold bg-bg2 border border-border text-white flex items-center gap-2"
        >
          <Timer size={18} />
          Timer
        </button>
      </div>

      {timerSeconds !== null && (
        <RestTimer
          initialSeconds={timerSeconds}
          onClose={() => setTimerSeconds(null)}
        />
      )}
    </div>
  );
}

interface CardProps {
  index: number;
  exercise: Exercise;
  ultimaCarga: number | null;
  log: ExerciseSession;
  tipOpen: boolean;
  onToggleTip: () => void;
  onChangeCarga: (v: number | undefined) => void;
  onChangeReps: (v: number | undefined) => void;
  onAbrirTimer: () => void;
}

function ExerciseCard({
  index,
  exercise,
  ultimaCarga,
  log,
  tipOpen,
  onToggleTip,
  onChangeCarga,
  onChangeReps,
  onAbrirTimer,
}: CardProps) {
  const thumb = getThumbnail(exercise.videoUrl);

  return (
    <div className="bg-bg2 border border-border rounded-2xl overflow-hidden">
      <div className="flex gap-3 p-4">
        <a
          href={exercise.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 relative w-24 h-24 rounded-xl overflow-hidden bg-bg3 group"
          aria-label={`Ver execução: ${exercise.nome}`}
        >
          {thumb ? (
            <img
              src={thumb}
              alt={exercise.nome}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              <PlayCircle size={32} />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 group-active:bg-black/50 flex items-center justify-center">
            <PlayCircle size={28} className="text-white drop-shadow-lg" />
          </div>
        </a>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs text-accent font-semibold">
                {index}.
              </div>
              <div className="font-semibold text-white text-sm leading-tight">
                {exercise.nome}
              </div>
              <div className="text-xs text-muted mt-0.5">{exercise.grupo}</div>
              {exercise.observacao && (
                <div className="text-[11px] text-accent/80 mt-0.5 italic">
                  {exercise.observacao}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
            <span className="text-white/80">
              <span className="text-muted">Séries:</span>{' '}
              <strong>
                {exercise.series}×{exercise.reps}
              </strong>
            </span>
            <span className="text-white/80">
              <span className="text-muted">Sug:</span>{' '}
              <strong>
                {exercise.cargaSugerida}
                {exercise.cargaUnidade}
              </strong>
            </span>
            <span className="text-white/80">
              <span className="text-muted">Desc:</span>{' '}
              <strong>{formatDescanso(exercise.descansoSeg)}</strong>
            </span>
          </div>

          {ultimaCarga !== null && (
            <div className="text-[11px] text-accent mt-1 font-semibold">
              Última: {ultimaCarga}kg
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-3 grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider text-muted block mb-1">
            Carga (kg)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.5"
            value={log.cargaUsada ?? ''}
            onChange={(e) =>
              onChangeCarga(
                e.target.value === '' ? undefined : Number(e.target.value),
              )
            }
            placeholder={String(exercise.cargaSugerida)}
            className="w-full bg-bg3 border border-border rounded-lg px-3 py-2 text-white text-sm focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider text-muted block mb-1">
            Reps feitas
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={log.repsFeitas ?? ''}
            onChange={(e) =>
              onChangeReps(
                e.target.value === '' ? undefined : Number(e.target.value),
              )
            }
            placeholder={exercise.reps}
            className="w-full bg-bg3 border border-border rounded-lg px-3 py-2 text-white text-sm focus:border-accent focus:outline-none"
          />
        </label>
        <button
          onClick={onAbrirTimer}
          className="bg-bg3 border border-border rounded-lg px-3 py-2 text-muted hover:text-white"
          aria-label="Iniciar timer de descanso"
        >
          <Timer size={18} />
        </button>
      </div>

      <button
        onClick={onToggleTip}
        className="w-full px-4 py-2.5 border-t border-border flex items-center justify-between text-xs text-muted hover:text-white"
      >
        <span className="flex items-center gap-1.5">
          <Lightbulb size={14} className="text-accent" />
          Dica técnica
        </span>
        {tipOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {tipOpen && (
        <div className="px-4 pb-4 text-xs text-white/80 leading-relaxed">
          {exercise.dica}
        </div>
      )}
    </div>
  );
}
