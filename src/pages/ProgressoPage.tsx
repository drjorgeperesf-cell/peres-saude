import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { getTreinoById } from '@/data/treinos';
import { formatDate } from '@/lib/format';
import { deleteSession, getSessions } from '@/lib/storage';
import type { SessionLog } from '@/types';

export default function ProgressoPage() {
  const [sessions, setSessions] = useState<SessionLog[]>(() => getSessions());

  function handleDelete(id: string) {
    if (!confirm('Apagar este registro?')) return;
    deleteSession(id);
    setSessions(getSessions());
  }

  return (
    <div className="pb-24">
      <PageHeader
        title="Progresso"
        subtitle={`${sessions.length} sessão${sessions.length === 1 ? '' : 'ões'} registrada${sessions.length === 1 ? '' : 's'}`}
      />

      <div className="px-5">
        {sessions.length === 0 ? (
          <div className="bg-bg2 border border-border rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">📈</div>
            <h2 className="font-bold text-white text-lg mb-1">
              Nenhum treino registrado
            </h2>
            <p className="text-sm text-muted">
              Termine uma sessão pra começar o histórico.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => {
              const treino = getTreinoById(s.treinoId);
              return (
                <div
                  key={s.id}
                  className="bg-bg2 border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="font-bold text-white">
                        {treino?.emoji} Treino {s.treinoId}
                      </div>
                      <div className="text-xs text-muted">
                        {formatDate(s.data)} · {s.exercicios.length} exercício
                        {s.exercicios.length === 1 ? '' : 's'} registrado
                        {s.exercicios.length === 1 ? '' : 's'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-muted hover:text-red-400 -mr-1"
                      aria-label="Apagar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {s.exercicios.map((e) => {
                      const ex = treino?.exercicios.find(
                        (x) => x.id === e.exerciseId,
                      );
                      return (
                        <div
                          key={e.exerciseId}
                          className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-b-0"
                        >
                          <span className="text-white/80 truncate pr-2">
                            {ex?.nome ?? e.exerciseId}
                          </span>
                          <span className="text-accent font-semibold flex-shrink-0">
                            {e.cargaUsada ?? '—'}kg
                            {typeof e.repsFeitas === 'number' &&
                              ` × ${e.repsFeitas}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
