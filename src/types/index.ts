export interface Exercise {
  id: string;
  nome: string;
  grupo: string;
  series: number;
  reps: string;
  cargaSugerida: number;
  cargaUnidade: 'kg' | 'lb';
  descansoSeg: number;
  videoUrl: string;
  dica: string;
  observacao?: string;
}

export interface Treino {
  id: 'A' | 'B' | 'C';
  nome: string;
  foco: string;
  emoji: string;
  gruposPrincipais: string[];
  exercicios: Exercise[];
}

export interface SetLog {
  carga: number;
  reps: number;
}

export interface ExerciseSession {
  exerciseId: string;
  sets: SetLog[];
  cargaUsada?: number;
  repsFeitas?: number;
}

export interface SessionLog {
  id: string;
  treinoId: 'A' | 'B' | 'C';
  data: string;
  exercicios: ExerciseSession[];
  duracaoMin?: number;
}

export type DiaSemana = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';

export interface EstruturaSemana {
  seg: 'A' | 'B' | 'C' | null;
  ter: 'A' | 'B' | 'C' | null;
  qua: 'A' | 'B' | 'C' | null;
  qui: 'A' | 'B' | 'C' | null;
  sex: 'A' | 'B' | 'C' | null;
  sab: 'A' | 'B' | 'C' | null;
  dom: 'A' | 'B' | 'C' | null;
}
