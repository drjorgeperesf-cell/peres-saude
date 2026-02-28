import { Video, FileText, Activity } from 'lucide-react';

export default function Services() {
  return (
    <section id="sec-srv" className="py-[100px] px-7 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5 reveal">Nossos Serviços</p>
        <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-[#050A18] mb-3.5 leading-[1.1] reveal d1">
          Tudo que você precisa,<br />em um único lugar
        </h2>
        <p className="text-[16px] text-slate-500 max-w-[520px] mb-14 leading-[1.7] reveal d2">
          Atendimento médico completo sem sair de casa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5.5">
          <div className="relative p-9 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-450 overflow-hidden cursor-default group hover:bg-white hover:border-slate-200 hover:shadow-[0_18px_52px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 reveal">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D47E] to-blue-500 scale-x-0 origin-left transition-transform duration-450 group-hover:scale-x-100" />
            <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-[rgba(59,130,246,0.08)] flex items-center justify-center mb-5.5 transition-all duration-350 group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:shadow-[0_6px_20px_rgba(0,212,126,0.15)]">
              <Video className="w-5.5 h-5.5 text-[#00D47E] transition-colors duration-300 group-hover:text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[19px] font-extrabold text-[#050A18] mb-2">Teleconsulta Completa</h3>
            <p className="text-[14.5px] text-slate-500 leading-[1.6]">
              Consulta médica por vídeo com avaliação detalhada, anamnese completa e conduta personalizada.
            </p>
          </div>

          <div className="relative p-9 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-450 overflow-hidden cursor-default group hover:bg-white hover:border-slate-200 hover:shadow-[0_18px_52px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 reveal d1">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D47E] to-blue-500 scale-x-0 origin-left transition-transform duration-450 group-hover:scale-x-100" />
            <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-[rgba(59,130,246,0.08)] flex items-center justify-center mb-5.5 transition-all duration-350 group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:shadow-[0_6px_20px_rgba(0,212,126,0.15)]">
              <FileText className="w-5.5 h-5.5 text-[#00D47E] transition-colors duration-300 group-hover:text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[19px] font-extrabold text-[#050A18] mb-2">Receitas Digitais</h3>
            <p className="text-[14.5px] text-slate-500 leading-[1.6]">
              Prescrições com certificação digital ICP-Brasil, aceitas em todas as farmácias do país via QR Code.
            </p>
          </div>

          <div className="relative p-9 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-450 overflow-hidden cursor-default group hover:bg-white hover:border-slate-200 hover:shadow-[0_18px_52px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 reveal d2">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D47E] to-blue-500 scale-x-0 origin-left transition-transform duration-450 group-hover:scale-x-100" />
            <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-[rgba(59,130,246,0.08)] flex items-center justify-center mb-5.5 transition-all duration-350 group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:shadow-[0_6px_20px_rgba(0,212,126,0.15)]">
              <Activity className="w-5.5 h-5.5 text-[#00D47E] transition-colors duration-300 group-hover:text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[19px] font-extrabold text-[#050A18] mb-2">Pedidos de Exames</h3>
            <p className="text-[14.5px] text-slate-500 leading-[1.6]">
              Solicitação de exames laboratoriais e de imagem enviados digitalmente, com reavaliação incluída.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
