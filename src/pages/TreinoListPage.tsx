import { ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  ESTRUTURA_SEMANA_PADRAO,
  PRINCIPIOS,
  TREINOS,
  getTreinoById,
} from '@/data/treinos';
import type { DiaSemana } from '@/types';

interface Props {
  onOpenTreino: (id: 'A' | 'B' | 'C') => void;
}

const DIAS: { key: DiaSemana; label: string }[] = [
  { key: 'seg', label: 'Segunda' },
  { key: 'ter', label: 'Terça' },
  { key: 'qua', label: 'Quarta' },
  { key: 'qui', label: 'Quinta' },
  { key: 'sex', label: 'Sexta' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
];

export default function TreinoListPage({ onOpenTreino }: Props) {
  return (
    <div className="pb-24">
      <PageHeader title="Treinos" subtitle="ABC v2 — 3x/semana" />

      <div className="px-5 space-y-3">
        {TREINOS.map((treino) => (
          <button
            key={treino.id}
            onClick={() => onOpenTreino(treino.id)}
            className="w-full bg-bg2 border border-border rounded-2xl p-4 flex items-center justify-between gap-3 active:scale-[0.99] transition-transform text-left"
          >
            <div className="min-w-0">
              <div className="font-bold text-white text-lg flex items-center gap-2">
                <span>{treino.emoji}</span>
                <span className="truncate">{treino.nome}</span>
              </div>
              <div className="text-xs text-muted mt-1 truncate">
                {treino.exercicios.length} exercícios · {treino.foco}
              </div>
            </div>
            <ChevronRight size={20} className="text-muted flex-shrink-0" />
          </button>
        ))}
      </div>

      <div className="px-5 mt-6">
        <div className="bg-bg2 border border-border rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-3">
            Estrutura da Semana
          </h2>
          <div className="space-y-2">
            {DIAS.map(({ key, label }) => {
              const treinoId = ESTRUTURA_SEMANA_PADRAO[key];
              const treino = treinoId ? getTreinoById(treinoId) : null;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-1.5 border-b border-border/60 last:border-b-0"
                >
                  <span className="font-semibold text-white text-sm">
                    {label}
                  </span>
                  <span
                    className={`text-sm ${
                      treino ? 'text-accent font-semibold' : 'text-muted'
                    }`}
                  >
                    {treino ? treino.nome.replace('Treino ', '') : 'Descanso'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-bg2 border border-border rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-3">Princípios</h2>
          <ul className="space-y-2">
            {PRINCIPIOS.map((p, i) => (
              <li key={i} className="text-sm text-white/80 flex gap-2">
                <span className="text-accent flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
