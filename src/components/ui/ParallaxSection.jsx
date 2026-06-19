"use client";
import { useRef, useEffect } from 'react';

export default function ParallaxSection({ children, style = {} }) {
  const containerRef = useRef(null);
  const bgRef        = useRef(null);
  const contentRef   = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg        = bgRef.current;
    const content   = contentRef.current;
    if (!container || !bg || !content) return;

    const tick = () => {
      const rect     = container.getBoundingClientRect();
      const vh       = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      const shift = (vh - rect.top) / (vh + rect.height) - 0.5;
      bg.style.transform      = `translateY(${-shift * 400}px)`;
      content.style.transform = `translateY(${-shift * 40}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Funde los bordes top/bottom con el fondo de la página
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        ...style,
      }}
    >
      {/* Fondo agresivo: burdeos brillante domina, transición muy corta */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-80%', left: 0,
        width: '100%', height: '260%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          'repeating-linear-gradient(-50deg, transparent 0px, transparent 22px, rgba(255,255,255,0.022) 22px, rgba(255,255,255,0.022) 23px)',
          'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(204,0,68,0.45) 0%, transparent 60%)',
          // Transición corta (5%) → burdeos/rojo ocupa el 90% del centro
          'linear-gradient(to bottom, #1a000a 0%, #660033 5%, #cc0044 40%, #cc0044 60%, #660033 95%, #1a000a 100%)',
        ].join(', '),
      }} />

      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
