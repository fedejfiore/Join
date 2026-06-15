"use client";
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Home, ShoppingBag, Calculator, Scale } from 'lucide-react';

const HERO_ACTIONS = [
  { icon: Home,        label: '¿Querés vender?',        href: '/tasaciones' },
  { icon: ShoppingBag, label: '¿Querés comprar?',       href: '/propiedades' },
  { icon: Calculator,  label: 'Tasá tu propiedad',      href: '/tasaciones' },
  { icon: Scale,       label: 'Consulta jurídica',      href: '/juridico' },
];

export default function HeroJoin({ config, brand }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const videoSrc = config?.video_fondo?.valor || config?.Video_fondo?.valor || '/hero-mobile.mp4';
  const ctaTexto = config?.cta_texto?.valor   || config?.Cta_Texto?.valor   || 'Ver propiedades';
  const ctaUrl   = config?.cta_url?.valor     || config?.Cta_Url?.valor     || '/propiedades';

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

      {/* CONTENIDO CENTRAL */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto pb-40 md:pb-48">
        <p className="text-[9px] font-black tracking-[10px] text-white/50 uppercase mb-6">
          INMOBILIARIA &amp; ESTUDIO JURÍDICO · BUENOS AIRES
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-none tracking-tighter max-w-4xl">
          Inmobiliaria y Estudio Jurídico.{' '}
          <span className="block text-2xl md:text-4xl lg:text-5xl text-white/80 mt-3 font-bold normal-case tracking-normal">
            Especialistas en Sucesiones y Operaciones Simultáneas.
          </span>
        </h1>

        {mounted && typewriterStrings.length > 0 && (
          <div className="mt-6 text-base md:text-xl font-bold text-[#5D9CEC] tracking-tight min-h-[1.75rem]">
            <Typewriter
              options={{ strings: typewriterStrings, autoStart: true, loop: true, delay: 60, deleteSpeed: 30 }}
            />
          </div>
        )}
      </div>

      {/* GLASSMORPHISM ACTION CARDS — BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-0">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {HERO_ACTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href}
                className="flex flex-col items-center gap-3 py-6 px-4 transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderBottom: 'none',
                  borderRadius: '1.25rem 1.25rem 0 0',
                }}
              >
                <Icon size={30} strokeWidth={1.25} className="text-white/80 group-hover:text-white transition-colors" />
                <span className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors text-center leading-tight tracking-wider uppercase">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-4 z-10" style={{ background: '#0f0f0f' }} />
    </section>
  );
}
