export default function HowItWorks() {
  return (
    <section id="sec-how" className="py-[100px] px-7 bg-[#050A18] relative overflow-hidden">
      <div className="absolute rounded-full blur-[90px] pointer-events-none w-[480px] h-[480px] -top-20 -left-45 bg-[rgba(59,130,246,0.05)]" />
      <div className="absolute rounded-full blur-[90px] pointer-events-none w-[380px] h-[380px] -bottom-20 -right-20 bg-[rgba(0,212,126,0.04)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5 reveal">Passo a Passo</p>
        <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-white mb-3.5 leading-[1.1] reveal d1">
          Simples, rápido<br />e sem burocracia
        </h2>
        <p className="text-[16px] text-slate-400 max-w-[520px] mb-14 leading-[1.7] reveal d2">
          Em três passos você tem acesso a atendimento médico de qualidade.
        </p>

        <div className="flex flex-col relative max-w-[680px]">
          <div className="absolute left-[30px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00D47E] via-blue-500 to-transparent opacity-15" />
          
          <div className="flex gap-7 items-start py-9 relative group reveal">
            <div className="w-[60px] h-[60px] shrink-0 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center text-[22px] font-black text-[#00D47E] transition-all duration-350 relative z-10 group-hover:bg-gradient-to-br group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_28px_rgba(0,212,126,0.15)] md:w-[60px] md:h-[60px] md:text-[22px] md:rounded-[18px] w-[46px] h-[46px] text-[17px] rounded-[13px]">
              1
            </div>
            <div>
              <h3 className="text-[20px] font-extrabold text-white mb-2">Preencha sua ficha</h3>
              <p className="text-[14.5px] text-slate-400 leading-[1.65]">
                Acesse o formulário abaixo, preencha seus dados pessoais e selecione o motivo. Leva menos de 2 minutos.
              </p>
            </div>
          </div>

          <div className="flex gap-7 items-start py-9 relative group reveal d1">
            <div className="w-[60px] h-[60px] shrink-0 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center text-[22px] font-black text-[#00D47E] transition-all duration-350 relative z-10 group-hover:bg-gradient-to-br group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_28px_rgba(0,212,126,0.15)] md:w-[60px] md:h-[60px] md:text-[22px] md:rounded-[18px] w-[46px] h-[46px] text-[17px] rounded-[13px]">
              2
            </div>
            <div>
              <h3 className="text-[20px] font-extrabold text-white mb-2">Realize o pagamento</h3>
              <p className="text-[14.5px] text-slate-400 leading-[1.65]">
                Ao finalizar, você será redirecionado para o pagamento seguro via Stripe. PIX ou Cartão de Crédito.
              </p>
            </div>
          </div>

          <div className="flex gap-7 items-start py-9 relative group reveal d2">
            <div className="w-[60px] h-[60px] shrink-0 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center text-[22px] font-black text-[#00D47E] transition-all duration-350 relative z-10 group-hover:bg-gradient-to-br group-hover:from-[#00D47E] group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_28px_rgba(0,212,126,0.15)] md:w-[60px] md:h-[60px] md:text-[22px] md:rounded-[18px] w-[46px] h-[46px] text-[17px] rounded-[13px]">
              3
            </div>
            <div>
              <h3 className="text-[20px] font-extrabold text-white mb-2">Receba sua consulta</h3>
              <p className="text-[14.5px] text-slate-400 leading-[1.65]">
                Após o pagamento, seus dados são enviados ao WhatsApp da clínica automaticamente. Aguarde o link da sala de vídeo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
