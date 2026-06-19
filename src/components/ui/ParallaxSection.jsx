"use client";
import { useRef, useEffect } from 'react';

/**
 * Sección parallax de 3 capas:
 *  - Fondo  → se mueve ±120px (más rápido)
 *  - Texto  → se mueve ±35px  (más lento)
 *  - Contenedor → fluye normal en el layout
 * La diferencia de velocidad entre capas crea profundidad obvia.
 */
export default function ParallaxSection({ children, style = {} }) {
  const containerRef = useRef(null);
  const bgRef        = useRef(null);
  const contentRef   = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bgEl      = bgRef.current;
    const contentEl = contentRef.current;
    if (!container || !bgEl || !contentEl) return;

    const tick = () => {
      const rect     = container.getBoundingClientRect();
      const vh       = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const shift    = (progress - 0.5);           // −0.5 a +0.5

      bgEl.style.transform      = `translateY(${shift * 240}px)`;  // ±120px
      contentEl.style.transform = `translateY(${shift * 70}px)`;   // ±35px
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

      {/* CAPA 1 — fondo, se mueve más */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-60%', left: 0,
        width: '100%', height: '220%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          'repeating-linear-gradient(-55deg, transparent 0px, transparent 18px, rgba(255,255,255,0.022) 18px, rgba(255,255,255,0.022) 19px)',
          'radial-gradient(ellipse 80% 40% at 50% 28%, rgba(204,0,68,0.35) 0%, transparent 70%)',
          'radial-gradient(ellipse 60% 30% at 50% 74%, rgba(102,0,51,0.40) 0%, transparent 65%)',
          'linear-gradient(to bottom, #06000a 0%, #2a0018 18%, #660033 38%, #99003d 50%, #660033 62%, #2a0018 82%, #06000a 100%)',
        ].join(', '),
      }} />

      {/* CAPA 2 — contenido (texto), se mueve menos */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        {children}
      </div>

    </div>
  );
}
