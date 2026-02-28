import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Maria Silva",
      role: "Paciente de Primeira Consulta",
      text: "A consulta foi excelente. O Dr. Jorge me ouviu com calma, tirou todas as minhas dúvidas e a receita chegou no meu celular na mesma hora. Muito prático!",
      rating: 5
    },
    {
      name: "Carlos Eduardo",
      role: "Paciente Regular",
      text: "Primeira vez usando telemedicina e me surpreendi. Atendimento humanizado e sem pressa. Recomendo de olhos fechados para quem busca praticidade.",
      rating: 5
    },
    {
      name: "Ana Paula",
      role: "Atendimento de Rotina",
      text: "Estava com muita dor e não queria ir ao pronto socorro. Fui atendida rapidamente, recebi o pedido de exame e a medicação. Salvou meu dia!",
      rating: 5
    }
  ];

  return (
    <section className="py-[100px] px-7 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5 reveal">O que dizem nossos pacientes</p>
          <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] text-[#050A18] leading-[1.1] reveal d1">
            Atendimento que faz a diferença
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className={`bg-slate-50 rounded-3xl p-8 border border-slate-100 relative reveal ${i === 1 ? 'd1' : i === 2 ? 'd2' : ''}`}>
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" strokeWidth={1} />
              
              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-[14.5px] text-slate-600 leading-[1.7] mb-7 relative z-10 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D47E] to-blue-500 flex items-center justify-center text-white font-bold text-[14px]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[14px] font-extrabold text-[#050A18]">{review.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
