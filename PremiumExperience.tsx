import { Sparkles, Clock, HeartHandshake } from 'lucide-react';

export default function PremiumExperience() {
  return (
    <section className="py-[100px] px-7 bg-[#050A18] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(0,212,126,0.04),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10.5px] font-bold text-amber-500 uppercase tracking-[0.14em] mb-6 reveal">
            <Sparkles className="w-3 h-3" /> Padrão Ouro em Telemedicina
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-white leading-[1.1] reveal d1">
            A Experiência Peres Saúde
          </h2>
          <p className="text-[16px] text-slate-400 max-w-[520px] mx-auto mt-4 leading-[1.7] reveal d2">
            Medicina que alia tecnologia de ponta com o cuidado humano e o tempo que você merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 reveal">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-amber-400" strokeWidth={2} />
            </div>
            <h3 className="text-[18px] font-extrabold text-white mb-3">Consulta Sem Pressa</h3>
            <p className="text-[14px] text-slate-400 leading-[1.6]">
              O tempo da consulta é o tempo necessário para você. Escuta ativa, investigação detalhada e foco total no seu bem-estar, sem olhar para o relógio.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 reveal d1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D47E]/20 to-blue-500/10 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-[#00D47E]" strokeWidth={2} />
            </div>
            <h3 className="text-[18px] font-extrabold text-white mb-3">Peres AI Integrada</h3>
            <p className="text-[14px] text-slate-400 leading-[1.6]">
              Nossa inteligência artificial avançada está disponível 24h para tirar dúvidas gerais de saúde e preparar seu histórico antes mesmo da consulta começar.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 reveal d2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6 text-blue-400" strokeWidth={2} />
            </div>
            <h3 className="text-[18px] font-extrabold text-white mb-3">Cuidado Contínuo</h3>
            <p className="text-[14px] text-slate-400 leading-[1.6]">
              O atendimento não termina na chamada de vídeo. Acompanhamento humanizado via WhatsApp para garantir que o tratamento está funcionando.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
