export default function TrustMarquee() {
  const brands = [
    "Drogasil", "Droga Raia", "Pacheco", "Drogaria São Paulo", "Pague Menos", "Panvel", "Venancio"
  ];

  return (
    <div className="py-11 bg-white overflow-hidden border-b border-slate-100">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        Receitas aceitas nas principais redes do Brasil
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="flex items-center px-11 font-serif text-[21px] text-slate-300 italic whitespace-nowrap select-none transition-colors duration-300 hover:text-slate-600">
              {brand}
              <span className="text-slate-200 text-[9px] px-2 not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
