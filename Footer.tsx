import { Activity, Mail, MapPin, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 92;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050A18] text-white pt-[72px] px-7 pb-9 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[280px] rounded-full bg-[radial-gradient(ellipse,rgba(0,212,126,0.03),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-11 mb-14 relative z-10 text-center md:text-left">
        <div>
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <div className="w-10.5 h-10.5 rounded-xl bg-gradient-to-br from-[#00D47E] to-blue-500 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold tracking-[0.1em] uppercase">Peres Saúde</h3>
              <span className="text-[9.5px] text-slate-500 font-semibold tracking-[0.1em]">Medicina Inteligente</span>
            </div>
          </div>
          <div className="text-[13.5px] text-slate-500 leading-[1.75]">
            <p><strong className="text-slate-300 font-semibold">Responsável Técnico:</strong><br />Dr. Jorge Nelson Moinhos Peres Filho</p>
            <p className="mt-2"><strong className="text-slate-300 font-semibold">Registro:</strong> CRM MG 112779</p>
            <p className="mt-2"><strong className="text-slate-300 font-semibold">CNPJ:</strong> 62.864.812/0001-32</p>
          </div>
        </div>

        <div>
          <h4 className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-slate-400 mb-5.5">Navegação</h4>
          <ul className="list-none space-y-3">
            <li><button onClick={() => scrollTo('hero-top')} className="bg-transparent border-none text-slate-500 text-[13.5px] cursor-pointer transition-colors hover:text-[#00D47E] font-sans">Sobre o Dr. Jorge</button></li>
            <li><button onClick={() => scrollTo('sec-creds')} className="bg-transparent border-none text-slate-500 text-[13.5px] cursor-pointer transition-colors hover:text-[#00D47E] font-sans">Credenciais</button></li>
            <li><button onClick={() => scrollTo('sec-srv')} className="bg-transparent border-none text-slate-500 text-[13.5px] cursor-pointer transition-colors hover:text-[#00D47E] font-sans">Serviços</button></li>
            <li><button onClick={() => scrollTo('sec-how')} className="bg-transparent border-none text-slate-500 text-[13.5px] cursor-pointer transition-colors hover:text-[#00D47E] font-sans">Como Funciona</button></li>
            <li><button onClick={() => scrollTo('sec-faq')} className="bg-transparent border-none text-slate-500 text-[13.5px] cursor-pointer transition-colors hover:text-[#00D47E] font-sans">Dúvidas</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-slate-400 mb-5.5">Contato</h4>
          <div className="flex items-center gap-2.5 mb-3.5 text-[13.5px] text-slate-500 justify-center md:justify-start">
            <Mail className="shrink-0 w-4 h-4 text-slate-600" strokeWidth={2} /> drjorgeperes@gmail.com
          </div>
          <div className="flex items-center gap-2.5 mb-3.5 text-[13.5px] text-slate-500 justify-center md:justify-start">
            <MapPin className="shrink-0 w-4 h-4 text-slate-600" strokeWidth={2} /> R. Rio Grande do Norte, 1435 — Savassi, BH/MG
          </div>
          <a href="https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D47E] text-[#050A18] text-[12.5px] font-extrabold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:bg-[#00E88A] mt-1.5 justify-center md:justify-start">
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} /> Agendar Consulta
          </a>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto mb-11 p-5.5 rounded-xl bg-red-600/5 border border-red-600/10 text-center relative z-10">
        <div className="text-[10px] font-extrabold text-red-300 uppercase tracking-[0.13em] mb-2 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-red-300" strokeWidth={2.5} /> Aviso de Segurança
        </div>
        <p className="text-[12px] text-red-300/55 leading-[1.65]">
          Serviço destinado a atendimentos eletivos. Em <strong className="text-red-300 font-bold">urgência ou risco de vida</strong>, dirija-se ao <strong className="text-red-300 font-bold">Pronto Socorro</strong> mais próximo.
        </p>
      </div>

      <div className="text-center pt-7 border-t border-white/5 relative z-10">
        <p className="text-[10.5px] text-slate-600 font-semibold tracking-[0.07em]">
          &copy; 2026 Peres Saúde — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
