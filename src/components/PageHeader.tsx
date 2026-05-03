import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, onBack, right }: Props) {
  return (
    <header className="px-5 pt-12 pb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-2 min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            className="-ml-2 mt-1 text-white/80 hover:text-white"
            aria-label="Voltar"
          >
            <ChevronLeft size={28} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-white tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {right && <div className="flex-shrink-0 mt-1">{right}</div>}
    </header>
  );
}
