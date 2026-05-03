import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import {
  clearAllSessions,
  getRestTimer,
  getSessions,
  setRestTimer,
} from '@/lib/storage';

export default function ConfigPage() {
  const [timer, setTimer] = useState(() => getRestTimer());
  const [savedFlash, setSavedFlash] = useState(false);
  const [sessionCount, setSessionCount] = useState(() => getSessions().length);

  function handleSalvar() {
    setRestTimer(timer);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  function handleClear() {
    if (
      !confirm(
        'Apagar TODO o histórico de treinos? Esta ação não pode ser desfeita.',
      )
    )
      return;
    clearAllSessions();
    setSessionCount(0);
  }

  function handleExport() {
    const data = {
      sessions: getSessions(),
      restTimer: getRestTimer(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plano-shape-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="pb-24">
      <PageHeader title="Configurações" />

      <div className="px-5 space-y-4">
        <div className="bg-bg2 border border-border rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-3">
            Timer de Descanso
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={10}
              max={600}
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value) || 0)}
              className="w-24 bg-bg3 border border-border rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
            />
            <span className="text-muted text-sm">segundos</span>
            <button
              onClick={handleSalvar}
              className="ml-auto bg-bg3 border border-border rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              {savedFlash ? 'Salvo ✓' : 'Salvar'}
            </button>
          </div>
          <p className="text-xs text-muted mt-2">
            Padrão usado quando o exercício não tiver descanso específico.
          </p>
        </div>

        <div className="bg-bg2 border border-border rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-3">Dados</h2>
          <div className="space-y-2">
            <button
              onClick={handleExport}
              disabled={sessionCount === 0}
              className="w-full bg-bg3 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 text-left"
            >
              Exportar histórico (.json)
              <span className="block text-xs text-muted font-normal mt-0.5">
                {sessionCount} sessão{sessionCount === 1 ? '' : 'ões'} salva
                {sessionCount === 1 ? '' : 's'} no aparelho
              </span>
            </button>
            <button
              onClick={handleClear}
              disabled={sessionCount === 0}
              className="w-full bg-bg3 border border-red-900/50 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 disabled:opacity-40 text-left"
            >
              Apagar todo o histórico
              <span className="block text-xs text-muted font-normal mt-0.5">
                Não pode ser desfeito
              </span>
            </button>
          </div>
        </div>

        <div className="bg-bg2 border border-border rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-2">Sobre</h2>
          <p className="text-sm text-white/80">Plano Shape v2.0</p>
          <p className="text-xs text-muted mt-1">
            App pessoal de treino e dieta. Dados salvos localmente no seu
            aparelho.
          </p>
        </div>
      </div>
    </div>
  );
}
