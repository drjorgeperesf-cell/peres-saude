import type { SessionLog } from '@/types';

const KEYS = {
  sessions: 'plano-shape:sessions:v1',
  restTimer: 'plano-shape:rest-timer:v1',
} as const;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getSessions(): SessionLog[] {
  if (typeof window === 'undefined') return [];
  return safeParse<SessionLog[]>(localStorage.getItem(KEYS.sessions), []);
}

export function saveSession(session: SessionLog): void {
  const all = getSessions();
  all.unshift(session);
  localStorage.setItem(KEYS.sessions, JSON.stringify(all));
}

export function deleteSession(id: string): void {
  const all = getSessions().filter((s) => s.id !== id);
  localStorage.setItem(KEYS.sessions, JSON.stringify(all));
}

export function clearAllSessions(): void {
  localStorage.removeItem(KEYS.sessions);
}

export function getLastCargaForExercise(exerciseId: string): number | null {
  const sessions = getSessions();
  for (const s of sessions) {
    const ex = s.exercicios.find((e) => e.exerciseId === exerciseId);
    if (ex && typeof ex.cargaUsada === 'number') {
      return ex.cargaUsada;
    }
  }
  return null;
}

export function getLastSessionForTreino(
  treinoId: 'A' | 'B' | 'C',
): SessionLog | null {
  return getSessions().find((s) => s.treinoId === treinoId) ?? null;
}

export function getRestTimer(): number {
  if (typeof window === 'undefined') return 90;
  const v = localStorage.getItem(KEYS.restTimer);
  const n = v ? Number(v) : 90;
  return Number.isFinite(n) && n > 0 ? n : 90;
}

export function setRestTimer(seconds: number): void {
  localStorage.setItem(KEYS.restTimer, String(seconds));
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
