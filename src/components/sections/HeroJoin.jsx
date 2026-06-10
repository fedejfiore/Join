"use client";

export default function HeroJoin({ config, brand }) {
  const titulo    = config?.Titulo?.valor    || "Inmobiliaria y Estudio Jurídico.";
  const subtitulo = config?.Subtitulo?.valor || "La decisión inteligente para vender, comprar o alquilar tu propiedad.";
  const videoSrc  = config?.Video_fondo?.valor || "/hero-mobile.mp4";

  return (
    <section className="hero-video-section">
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover" style={{zIndex:0}}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
        <p className="text-[10px] font-black tracking-[8px] text-white/70 uppercase mb-4">
          INMOBILIARIA & ESTUDIO JURÍDICO
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase text-white leading-tight tracking-tighter">
          {titulo}
        </h1>
        <p className="mt-6 text-base md:text-xl text-white/80 max-w-2xl leading-relaxed">
          {subtitulo}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/tasaciones"
            className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-sm">
            Tasá tu propiedad
          </a>
          <a href="/propiedades"
            className="border-2 border-white text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-[#0D3B66] transition-all text-sm">
            Ver propiedades
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-[#0a192f] to-transparent z-10" />
    </section>
  );
}
