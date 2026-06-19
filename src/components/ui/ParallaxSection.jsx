"use client";
import { useRef, useEffect } from 'react';

/**
 * Parallax profesional: fondo con gradiente vertical de alto contraste
 * (negro → burdeos brillante → negro). Al scrollear, el fondo se desplaza
 * ±200px revelando distintas zonas del gradiente — efecto muy visible y limpio.
 * El contenido (texto) se mueve ±20px para reforzar la sensación de profundidad.
 */
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
      const progress = (vh - rect.top) / (vh + rect.height); // 0 → 1
      const shift    = progress - 0.5;                        // −0.5 → +0.5

      bg.style.transform      = `translateY(${shift * 400}px)`; // ±200px — muy visible
      content.style.transform = `translateY(${shift * 40}px)`;  // ±20px  — sutil
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

      {/* Fondo con gradiente de alto contraste — el movimiento ±200px lo hace obvio */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-80%', left: 0,
        width: '100%', height: '260%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          // Textura: rayas diagonales apenas perceptibles
          'repeating-linear-gradient(-50deg, transparent 0px, transparent 22px, rgba(255,255,255,0.018) 22px, rgba(255,255,255,0.018) 23px)',
          // Glow central que se mueve con el fondo
          'radial-gradient(ellipse 85% 35% at 50% 50%, rgba(204,0,68,0.38) 0%, transparent 65%)',
          // Gradiente vertical: zonas claramente distintas
          'linear-gradient(to bottom, #000000 0%, #0a0004 8%, #2a0015 18%, #660033 35%, #cc0044 50%, #660033 65%, #2a0015 82%, #0a0004 92%, #000000 100%)',
        ].join(', '),
      }} />

      {/* Contenido */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
