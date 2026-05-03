export function formatDescanso(seg: number): string {
  if (seg < 60) return `${seg}s`;
  const min = Math.floor(seg / 60);
  const rest = seg % 60;
  return rest === 0 ? `${min}min` : `${min}m${rest}s`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}
