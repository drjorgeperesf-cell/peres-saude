import { CalendarCheck, Dumbbell, Flame } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { ESTRUTURA_SEMANA_PADRAO, getTreinoById } from '@/data/treinos';
import { formatDate } from '@/lib/format';
import { getSessions } from '@/lib/storage';
import type { Tab } from '@/App';

interface Props {
  onNavigate: (tab: Tab) => void;
  onOpenTreino: (id: 'A' | 'B' | 'C') => void;
}

const DIA_LABELS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as const;

function treinoDoDiaHoje(): 'A' | 'B' | 'C' | null {
  const dia = DIA_LABELS[new Date().getDay()];
  return ESTRUTURA_SEMANA_PADRAO[dia];
}

export default function HomePage({ onNavigate, onOpenTreino }: Props) {
  const sessions = getSessions();
  const treinosNaSemana = sessions.filter((s) => {
    const d = new Date(s.data);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const hoje = treinoDoDiaHoje();
  const treinoHoje = hoje ? getTreinoById(hoje) : null;
  const ultimaSessao = sessions[0];

  return (
    <div className="pb-24">
      <PageHeader title="Plano Shape" subtitle="ABC v2 — Hipertrofia" />

      <div className="px-5 space-y-4">
        {treinoHoje ? (
          <button
            onClick={() => onOpenTreino(treinoHoje.id)}
            className="w-full bg-gradient-to-br from-accent to-accent-hover text-bg rounded-2xl p-5 text-left shadow-lg active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              <Flame size={14} /> Treino de hoje
            </div>
            <div className="text-2xl font-bold">{treinoHoje.nome}</div>
            <div className="text-sm font-medium opacity-80 mt-1">
              {treinoHoje.foco} · {treinoHoje.exercicios.length} exercícios
            </div>
          </button>
        ) : (
          <div className="bg-bg2 border border-border rounded-2xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
              Hoje
            </div>
            <div className="text-2xl font-bold text-white">Descanso</div>
            <div className="text-sm text-muted mt-1">
              Aproveite — recuperação faz parte da hipertrofia.
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg2 border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-wider mb-1">
              <Dumbbell size={14} /> Esta semana
            </div>
            <div className="text-3xl font-bold text-white">
              {treinosNaSemana}
            </div>
            <div className="text-xs text-muted">treinos registrados</div>
          </div>
          <div className="bg-bg2 border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-wider mb-1">
              <CalendarCheck size={14} /> Último treino
            </div>
            <div className="text-lg font-bold text-white truncate">
              {ultimaSessao
                ? `Treino ${ultimaSessao.treinoId}`
                : '—'}
            </div>
            <div className="text-xs text-muted">
              {ultimaSessao ? formatDate(ultimaSessao.data) : 'sem registros'}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('treino')}
          className="w-full bg-bg2 border border-border rounded-2xl p-4 text-left active:scale-[0.99] transition-transform"
        >
          <div className="text-sm font-semibold text-white">
            Ver todos os treinos
          </div>
          <div className="text-xs text-muted mt-0.5">
            A · B · C + estrutura da semana
          </div>
        </button>
      </div>
    </div>
  );
}
