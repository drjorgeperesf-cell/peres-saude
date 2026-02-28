import { Shield, Stethoscope, FileText, CheckCircle } from 'lucide-react';

export default function Credentials() {
  return (
    <section id="sec-creds" className="py-[100px] px-7 bg-slate-50 border-b border-slate-100">
      <div className="max-w-[1100px] mx-auto text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5 reveal">Por que confiar</p>
        <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-[#050A18] mb-3.5 leading-[1.1] reveal d1">
          Credenciais e Compromisso<br />com sua Saúde
        </h2>
        <p className="text-[16px] text-slate-500 max-w-[520px] mx-auto mb-14 leading-[1.7] reveal d2">
          Transparência, ética e responsabilidade técnica em cada atendimento.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)] hover:border-slate-200 text-center cursor-default reveal">
            <div className="w-[52px] h-[52px] rounded-xl mx-auto mb-4.5 flex items-center justify-center bg-[rgba(0,212,126,0.08)]">
              <Shield className="w-6 h-6 text-[#00D47E]" strokeWidth={2} />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#050A18] mb-1.5">CRM Ativo</h4>
            <p className="text-[13.5px] text-slate-500 leading-[1.55]">
              Registro CRM/MG 112779 ativo e regular junto ao Conselho Regional de Medicina de Minas Gerais.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)] hover:border-slate-200 text-center cursor-default reveal d1">
            <div className="w-[52px] h-[52px] rounded-xl mx-auto mb-4.5 flex items-center justify-center bg-[rgba(59,130,246,0.08)]">
              <Stethoscope className="w-6 h-6 text-blue-500" strokeWidth={2} />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#050A18] mb-1.5">Formação Médica</h4>
            <p className="text-[13.5px] text-slate-500 leading-[1.55]">
              Graduação em Medicina com formação generalista completa e experiência em atendimento clínico ambulatorial.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)] hover:border-slate-200 text-center cursor-default reveal d2">
            <div className="w-[52px] h-[52px] rounded-xl mx-auto mb-4.5 flex items-center justify-center bg-[rgba(168,85,247,0.08)]">
              <FileText className="w-6 h-6 text-purple-500" strokeWidth={2} />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#050A18] mb-1.5">Receita Certificada</h4>
            <p className="text-[13.5px] text-slate-500 leading-[1.55]">
              Prescrições com certificado digital ICP-Brasil, válidas em todo o território nacional conforme legislação vigente.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)] hover:border-slate-200 text-center cursor-default reveal d3">
            <div className="w-[52px] h-[52px] rounded-xl mx-auto mb-4.5 flex items-center justify-center bg-[rgba(245,158,11,0.08)]">
              <CheckCircle className="w-6 h-6 text-amber-500" strokeWidth={2} />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#050A18] mb-1.5">CNPJ Registrado</h4>
            <p className="text-[13.5px] text-slate-500 leading-[1.55]">
              Empresa Peres Saúde devidamente registrada — CNPJ 62.864.812/0001-32 — com todas as obrigações em dia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
