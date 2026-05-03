import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import ConfigPage from '@/pages/ConfigPage';
import DietaPage from '@/pages/DietaPage';
import HomePage from '@/pages/HomePage';
import ProgressoPage from '@/pages/ProgressoPage';
import TreinoDetailPage from '@/pages/TreinoDetailPage';
import TreinoListPage from '@/pages/TreinoListPage';

export type Tab = 'home' | 'treino' | 'dieta' | 'progresso' | 'config';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [openTreinoId, setOpenTreinoId] = useState<'A' | 'B' | 'C' | null>(
    null,
  );

  function handleOpenTreino(id: 'A' | 'B' | 'C') {
    setOpenTreinoId(id);
    setTab('treino');
  }

  function handleNavigate(t: Tab) {
    setTab(t);
    if (t !== 'treino') setOpenTreinoId(null);
  }

  function renderPage() {
    if (tab === 'treino' && openTreinoId) {
      return (
        <TreinoDetailPage
          treinoId={openTreinoId}
          onBack={() => setOpenTreinoId(null)}
        />
      );
    }
    switch (tab) {
      case 'home':
        return (
          <HomePage onNavigate={handleNavigate} onOpenTreino={handleOpenTreino} />
        );
      case 'treino':
        return <TreinoListPage onOpenTreino={handleOpenTreino} />;
      case 'dieta':
        return <DietaPage />;
      case 'progresso':
        return <ProgressoPage />;
      case 'config':
        return <ConfigPage />;
    }
  }

  return (
    <div className="min-h-dvh max-w-md mx-auto relative">
      {renderPage()}
      <BottomNav current={tab} onChange={handleNavigate} />
    </div>
  );
}
