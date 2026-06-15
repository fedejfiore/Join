"use client";
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function HeroJoin({ config, brand }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const videoSrc  = config?.video_fondo?.valor  || config?.Video_fondo?.valor  || '/hero-mobile.mp4';
  const ctaTexto  = config?.cta_texto?.valor    || config?.Cta_Texto?.valor    || 'Ver propiedades';
  const ctaUrl    = config?.cta_url?.valor      || config?.Cta_Url?.valor      || '/propiedades';

  const typewriterStrings = [
    config?.typewriter_1?.valor || 'Encontramos tu hogar ideal',
    config?.typewriter_2?.valor || 'Vendemos tu propiedad',
    config?.typewriter_3?.valor || 'Asesoramiento jurídico integral',
  ].filter(Boolean);

  return (
    <section className="hero-video-section">
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
        <p className="text-[10px] font-black tracking-[8px] text-white/70 uppercase mb-6">
          INMOBILIARIA &amp; ESTUDIO JURÍDICO
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase text-white leading-tight tracking-tighter max-w-4xl">
          Inmobiliaria y Estudio Jurídico.{' '}
          <span className="block text-3xl md:text-5xl lg:text-6xl text-white/90 mt-2">
            Especialistas en Sucesiones y Operaciones Simultáneas.
          </span>
        </h1>

        {mounted && typewriterStrings.length > 0 && (
          <div className="mt-8 text-lg md:text-2xl font-black italic text-accent tracking-tight min-h-[2rem]">
            <Typewriter
              options={{
                strings: typewriterStrings,
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 30,
              }}
            />
          </div>
        )}

        <p className="mt-6 text-sm md:text-base text-white/75 max-w-xl leading-relaxed font-medium">
          La decisión inteligente para vender, comprar o alquilar tu propiedad.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/tasaciones"
            className="bg-white text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-xs">
            Tasá tu propiedad
          </a>
          <a href={ctaUrl}
            className="border-2 border-white/70 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all text-xs">
            {ctaTexto}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#0a192f] to-transparent z-10" />
    </section>
  );
}
