import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Shield, Stethoscope, FileText, CheckCircle, Activity, Video, MapPin, Mail, ChevronDown, Send, MessageCircle } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 92;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 py-3.5 transition-all duration-350 ${scrolled ? 'bg-[#050A18]/90 backdrop-blur-xl border-b border-white/5 py-2.5' : ''}`}>
        <div className="max-w-7xl mx-auto px-7 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D47E] to-blue-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col text-left">
              <strong className="text-sm font-extrabold tracking-widest uppercase text-white leading-tight">Peres Saúde</strong>
              <span className="text-[9.5px] font-medium text-slate-400 tracking-wider">Dr. Jorge Peres</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('sec-creds')} className="text-[12.5px] font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00D47E] after:transition-all hover:after:w-full py-1">Credenciais</button>
            <button onClick={() => scrollTo('sec-srv')} className="text-[12.5px] font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00D47E] after:transition-all hover:after:w-full py-1">Serviços</button>
            <button onClick={() => scrollTo('sec-how')} className="text-[12.5px] font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00D47E] after:transition-all hover:after:w-full py-1">Como Funciona</button>
            <button onClick={() => scrollTo('sec-faq')} className="text-[12.5px] font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00D47E] after:transition-all hover:after:w-full py-1">Dúvidas</button>
            <a href="https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D47E] text-[#050A18] text-[11.5px] font-extrabold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:bg-[#00E88A] shadow-[0_0_20px_rgba(0,212,126,0.15),0_4px_12px_rgba(0,212,126,0.2)] hover:shadow-[0_0_32px_rgba(0,212,126,0.15),0_8px_24px_rgba(0,212,126,0.28)]">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} /> Agendar
            </a>
          </div>

          <button className="md:hidden text-white p-1.5" onClick={() => setMobOpen(!mobOpen)}>
            {mobOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {mobOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setMobOpen(false)}>
          <div className="absolute top-[68px] left-0 right-0 bg-[#0A1128] border-b border-white/5 px-7 py-5 flex flex-col gap-0.5 animate-in slide-in-from-top-2">
            <button onClick={() => scrollTo('sec-creds')} className="w-full text-left py-4 text-base font-bold text-white/80 border-b border-white/5 hover:text-[#00D47E] transition-colors">Credenciais</button>
            <button onClick={() => scrollTo('sec-srv')} className="w-full text-left py-4 text-base font-bold text-white/80 border-b border-white/5 hover:text-[#00D47E] transition-colors">Serviços</button>
            <button onClick={() => scrollTo('sec-how')} className="w-full text-left py-4 text-base font-bold text-white/80 border-b border-white/5 hover:text-[#00D47E] transition-colors">Como Funciona</button>
            <button onClick={() => scrollTo('sec-faq')} className="w-full text-left py-4 text-base font-bold text-white/80 border-b border-white/5 hover:text-[#00D47E] transition-colors">Dúvidas</button>
            <a href="https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01" target="_blank" rel="noreferrer" className="mt-3 text-center p-4 rounded-xl bg-[#00D47E] text-[#050A18] font-extrabold uppercase tracking-wider text-sm">
              Agendar Consulta
            </a>
          </div>
        </div>
      )}
    </>
  );
}
