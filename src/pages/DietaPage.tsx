import PageHeader from '@/components/PageHeader';

export default function DietaPage() {
  return (
    <div className="pb-24">
      <PageHeader title="Dieta" subtitle="Em construção" />
      <div className="px-5">
        <div className="bg-bg2 border border-border rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">☕</div>
          <h2 className="font-bold text-white text-lg mb-1">Em breve</h2>
          <p className="text-sm text-muted">
            Plano alimentar, macros e check-ins de refeição vão entrar nesta
            tela na próxima versão.
          </p>
        </div>
      </div>
    </div>
  );
}
