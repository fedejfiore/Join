"use client";
import { useRef, useEffect } from 'react';

/**
 * Parallax simple: el fondo se mueve a distinta velocidad que el contenido.
 * El div que sigue a este componente debe tener:
 *   position: relative; zIndex: 2; borderRadius: '2rem 2rem 0 0';
 *   marginTop: '-2rem'; background: var(--card-bg) o el color del fondo siguiente
 * → crea el efecto de "tarjeta que emerge por debajo" del parallax.
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
      const rect  = container.getBoundingClientRect();
      const vh    = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      const shift = (vh - rect.top) / (vh + rect.height) - 0.5;
      bg.style.transform      = `translateY(${-shift * 500}px)`;
      content.style.transform = `translateY(${-shift * 50}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Fondo 350% alto: movimiento ±250px claramente visible en zona opaca */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-125%', left: 0,
        width: '100%', height: '350%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          'repeating-linear-gradient(-50deg, transparent 0px, transparent 22px, rgba(255,255,255,0.022) 22px, rgba(255,255,255,0.022) 23px)',
          'radial-gradient(ellipse 85% 25% at 50% 50%, rgba(204,0,68,0.45) 0%, transparent 55%)',
          // Negro ocupa 65% (0-32% y 68-100%), burdeos solo 36% del centro, transición 5%
          'linear-gradient(to bottom, #000 0%, #000 32%, #660033 37%, #cc0044 47%, #cc0044 53%, #660033 63%, #000 68%, #000 100%)',
        ].join(', '),
      }} />

      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
