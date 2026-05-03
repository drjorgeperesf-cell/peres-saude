import { Pause, Play, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  initialSeconds: number;
  onClose: () => void;
}

export default function RestTimer({ initialSeconds, onClose }: Props) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          try {
            navigator.vibrate?.([200, 100, 200]);
          } catch {
            // ignore
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const display = `${min}:${sec.toString().padStart(2, '0')}`;
  const pct = initialSeconds > 0 ? (remaining / initialSeconds) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-bg2 border border-border rounded-3xl p-8 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white"
          aria-label="Fechar"
        >
          <X size={22} />
        </button>
        <div className="text-center">
          <p className="text-sm text-muted mb-2">Descanso</p>
          <div
            className={`text-7xl font-bold tabular-nums mb-2 ${
              remaining === 0 ? 'text-accent animate-pulse-glow' : 'text-white'
            }`}
          >
            {display}
          </div>
          <div className="h-1.5 bg-bg3 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-accent transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="bg-accent text-bg font-semibold rounded-full w-14 h-14 flex items-center justify-center"
            >
              {running ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button
              onClick={() => {
                setRemaining(initialSeconds);
                setRunning(true);
              }}
              className="bg-bg3 text-white rounded-full w-14 h-14 flex items-center justify-center"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
