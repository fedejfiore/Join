"use client";
import { useRef, useEffect } from 'react';

/**
 * Parallax: al scrollear hacia abajo el fondo se mueve de modo que
 * el borde INFERIOR del cuadro se va oscureciendo (funde con lo que sube
 * desde abajo). En modo claro los bordes son blancos en lugar de negros.
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
      const progress = (vh - rect.top) / (vh + rect.height); // 0→1
      const shift    = progress - 0.5;                        // −0.5→+0.5

      // NEGADO: fondo se mueve en sentido contrario → negro sube desde abajo
      bg.style.transform      = `translateY(${-shift * 400}px)`;
      content.style.transform = `translateY(${-shift * 40}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-80%', left: 0,
        width: '100%', height: '260%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          'repeating-linear-gradient(-50deg, transparent 0px, transparent 22px, rgba(255,255,255,0.018) 22px, rgba(255,255,255,0.018) 23px)',
          'radial-gradient(ellipse 85% 35% at 50% 50%, rgba(204,0,68,0.38) 0%, transparent 65%)',
          // Bordes adaptativos: negro en dark mode, gris claro en light mode
          'linear-gradient(to bottom, var(--parallax-edge) 0%, #0a0004 8%, #2a0015 18%, #660033 35%, #cc0044 50%, #660033 65%, #2a0015 82%, #0a0004 92%, var(--parallax-edge) 100%)',
        ].join(', '),
      }} />

      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
