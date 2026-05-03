import { Activity, Coffee, Dumbbell, Home, Settings } from 'lucide-react';
import type { Tab } from '@/App';

const TABS: { id: Tab; label: string; Icon: typeof Home }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'treino', label: 'Treino', Icon: Dumbbell },
  { id: 'dieta', label: 'Dieta', Icon: Coffee },
  { id: 'progresso', label: 'Progresso', Icon: Activity },
  { id: 'config', label: 'Config', Icon: Settings },
];

interface Props {
  current: Tab;
  onChange: (tab: Tab) => void;
}

export default function BottomNav({ current, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur border-t border-border safe-bottom">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {TABS.map(({ id, label, Icon }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                active ? 'text-accent' : 'text-muted hover:text-white'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[11px] ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
