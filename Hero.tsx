import { ArrowRight, Activity, FileText, Video } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 92;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-top" className="relative min-h-screen bg-[#050A18] overflow-hidden flex items-center pt-[110px] pb-[70px] px-7">
      <div className="absolute rounded-full blur-[90px] pointer-events-none w-[550px] h-[550px] -top-20 -right-20 bg-[rgba(0,212,126,0.07)] animate-orb1" />
      <div className="absolute rounded-full blur-[90px] pointer-events-none w-[450px] h-[450px] -bottom-30 -left-30 bg-[rgba(59,130,246,0.06)] animate-orb2" />
      <div className="absolute inset-0 hero-grid" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative z-10">
        <div className="order-2 md:order-1 text-center md:text-left animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10.5px] font-bold text-red-500 uppercase tracking-[0.14em] mb-7">
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 bg-red-500 rounded-full animate-pulse-dot" />
              <span className="absolute -inset-1 border-[1.5px] border-red-500 rounded-full animate-pulse-ring" />
            </span>
            Últimos horários para hoje
          </div>
          
          <h2 className="font-serif text-[clamp(2.5rem,5.2vw,4.2rem)] text-white leading-[1.08] mb-5.5">
            Medicina de<br />Excelência,<br /><em className="italic text-[#00D47E]">Onde Você Estiver</em>
          </h2>
          
          <p className="text-[17px] text-slate-400 leading-[1.72] mb-9 max-w-[470px] mx-auto md:mx-0">
            Consulta médica completa por vídeo chamada. Receitas digitais, pedidos de exames e orientação profissional — tudo pelo seu celular.
          </p>
          
          <div className="flex flex-wrap gap-3.5 justify-center md:justify-start">
            <a href="https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#00D47E] text-[#050A18] text-[13.5px] font-extrabold uppercase tracking-wider transition-all hover:-translate-y-1 hover:bg-[#00E88A] shadow-[0_0_36px_rgba(0,212,126,0.18),0_6px_18px_rgba(0,212,126,0.18)] hover:shadow-[0_0_56px_rgba(0,212,126,0.24),0_14px_36px_rgba(0,212,126,0.24)] animate-in zoom-in duration-500">
              <ArrowRight className="w-4 h-4 animate-pulse-dot" strokeWidth={2.5} /> Agendar Agora
            </a>
            <button onClick={() => scrollTo('sec-how')} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-transparent text-white text-[13.5px] font-bold uppercase tracking-wider border border-white/15 transition-all hover:border-white/35 hover:bg-white/5">
              Como Funciona
            </button>
          </div>
          
          <div className="flex gap-9 mt-11 pt-7 border-t border-white/5 justify-center md:justify-start">
            <div>
              <div className="text-[30px] font-black text-white leading-none mb-1">24<span className="text-[#00D47E]">h</span></div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Disponibilidade</div>
            </div>
            <div>
              <div className="text-[30px] font-black leading-none mb-1"><span className="text-[#00D47E]">100%</span></div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Digital</div>
            </div>
            <div>
              <div className="text-[30px] font-black text-white leading-none mb-1">CRM<span className="text-[#00D47E]"> MG</span></div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Registrado</div>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 perspective-[900px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          <div className="max-w-[300px] md:max-w-[380px] mx-auto relative group">
            <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-[0_36px_72px_rgba(0,0,0,0.35),0_0_50px_rgba(0,212,126,0.04)] transition-all duration-500 group-hover:shadow-[0_44px_88px_rgba(0,0,0,0.4),0_0_70px_rgba(0,212,126,0.06)] group-hover:-translate-y-1.5 group-hover:border-white/10">
              <div className="bg-gradient-to-br from-[#00D47E] to-blue-500 p-2 text-center text-[9.5px] font-extrabold text-white/90 uppercase tracking-[0.1em]">
                Medicina com calma, escuta ativa e tempo
              </div>
              <img src="https://i.postimg.cc/bvtWjFyV/IMG-1225.png" alt="Dr. Jorge Peres" className="w-full aspect-[4/5] object-cover block" loading="eager" />
              <div className="bg-gradient-to-b from-[#0A1128] to-[#050A18] p-6 text-center border-t-[3px] border-[#00D47E]">
                <h3 className="font-serif text-[20px] text-white mb-1.5">Dr. Jorge Nelson M. Peres Filho</h3>
                <div className="text-[9.5px] text-blue-400 font-bold uppercase tracking-[0.14em] mb-3">Diretor Técnico · Generalista</div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-[10.5px] text-slate-400 font-semibold tracking-wider">CRM MG 112779</div>
              </div>
            </div>
            
            <div className="hidden md:flex absolute z-10 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-[12.5px] font-bold text-white whitespace-nowrap shadow-[0_6px_24px_rgba(0,0,0,0.25)] top-[14%] -right-9 animate-float-1">
              <Video className="w-4 h-4 text-[#00D47E]" strokeWidth={2} /> Telemedicina
            </div>
            <div className="hidden md:flex absolute z-10 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-[12.5px] font-bold text-white whitespace-nowrap shadow-[0_6px_24px_rgba(0,0,0,0.25)] bottom-[28%] -left-9 animate-float-2">
              <FileText className="w-4 h-4 text-[#00D47E]" strokeWidth={2} /> Receita Digital
            </div>
            <div className="hidden md:flex absolute z-10 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-[12.5px] font-bold text-white whitespace-nowrap shadow-[0_6px_24px_rgba(0,0,0,0.25)] bottom-[7%] -right-4 animate-float-1">
              <Activity className="w-4 h-4 text-[#00D47E]" strokeWidth={2} /> Exames
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
