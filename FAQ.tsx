import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Como recebo o link da consulta?",
      a: "Cerca de 10 a 15 minutos antes do horário agendado, nossa equipe enviará o link seguro da sala de vídeo diretamente no seu WhatsApp. Basta clicar para entrar."
    },
    {
      q: "A receita digital é aceita nas farmácias?",
      a: "Sim. Emitimos receitas com certificação digital oficial (padrão ICP-Brasil), aceitas em todas as farmácias do território nacional. Apresente pelo QR Code no celular."
    },
    {
      q: "E se a conexão de internet cair?",
      a: "Sem problemas. Aguardamos o retorno. Caso não seja possível restabelecer, concluímos por áudio ou reagendamos sem custo adicional."
    },
    {
      q: "A teleconsulta substitui o presencial?",
      a: "Na maioria dos casos sim. Se necessário exame físico, o médico orientará buscar atendimento presencial adequado."
    },
    {
      q: "O que NÃO é prescrito na teleconsulta?",
      a: "Não atendemos emergências com risco de vida e não prescrevemos receitas de controle especial (Amarelas/Azuis) que exigem notificação física."
    },
    {
      q: "Como é feito o pagamento?",
      a: "Ao preencher a ficha, você será direcionado ao Stripe para pagamento seguro via PIX ou Cartão. Após a confirmação, seus dados são enviados automaticamente ao consultório."
    }
  ];

  return (
    <section id="sec-faq" className="py-[100px] px-7 bg-white">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5 text-center reveal">Perguntas Frequentes</p>
        <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-[#050A18] mb-[52px] leading-[1.1] text-center reveal">Tire suas dúvidas</h2>
        
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200 overflow-hidden reveal">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex justify-between items-center bg-transparent border-none cursor-pointer text-left font-sans group"
              >
                <span className="text-[15.5px] font-bold text-slate-800 pr-4 transition-colors group-hover:text-[#050A18]">
                  {faq.q}
                </span>
                <div className={`w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-[#00D47E]' : 'bg-slate-50'}`}>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-350 ${openIndex === i ? 'rotate-180 text-white' : 'text-slate-500'}`} strokeWidth={2.5} />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-450 ease-out ${openIndex === i ? 'max-h-[380px]' : 'max-h-0'}`}
              >
                <p className="pb-5 text-[14.5px] text-slate-500 leading-[1.72]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
