# Plano Shape v2.0

App pessoal de treino e dieta. Mobile-first, dados salvos no localStorage.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- lucide-react (ícones)

## Rodar local

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Build

```bash
npm run build
```

Saída em `dist/`. Deploy direto no Vercel — sem configuração extra.

## Features v2.0

- ABC hipertrofia (3x/semana: Seg/Qua/Sex)
- 21 exercícios com vídeo de execução do YouTube
- Dica técnica colapsável em cada exercício
- Inputs de carga e reps por exercício
- Histórico no localStorage com "última carga" automática
- Timer de descanso configurável (vibra ao final)
- Export do histórico em JSON

## Estrutura

```
src/
  App.tsx              # tab navigation
  main.tsx
  index.css
  components/
    BottomNav.tsx
    PageHeader.tsx
    RestTimer.tsx
  pages/
    HomePage.tsx
    TreinoListPage.tsx
    TreinoDetailPage.tsx
    DietaPage.tsx
    ProgressoPage.tsx
    ConfigPage.tsx
  data/
    treinos.ts         # ABC + estrutura semanal + princípios
  lib/
    storage.ts
    youtube.ts
    format.ts
  types/
    index.ts
```
