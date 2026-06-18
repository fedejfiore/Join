"use client";
import { useRef, useEffect } from 'react';

/**
 * Sección con efecto parallax JS: el fondo se mueve más lento que el contenido.
 * Usa imagen de fondo real para que el movimiento sea claramente visible.
 */
export default function ParallaxSection({
  children,
  style = {},
  imageSrc = '/images/heroBG.jpg',   // imagen de fondo — el movimiento es obvio con imágenes
  gradient = 'linear-gradient(135deg, rgba(26,0,16,0.88) 0%, rgba(102,0,51,0.80) 50%, rgba(51,0,25,0.88) 100%)',
}) {
  const containerRef = useRef(null);
  const bgRef        = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bgEl      = bgRef.current;
    if (!container || !bgEl) return;

    const tick = () => {
      const rect     = container.getBoundingClientRect();
      const vh       = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      // Mueve el fondo ±120px mientras la sección atraviesa el viewport
      bgEl.style.transform = `translateY(${(progress - 0.5) * 240}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

      {/* Fondo con imagen real — el movimiento es claramente visible */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-60%', left: 0,
        width: '100%', height: '220%',
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        {/* Overlay de gradiente burdeos sobre la imagen */}
        <div style={{
          position: 'absolute', inset: 0,
          background: gradient,
        }} />
        {/* Glows radiales */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,0,68,0.25) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(102,0,51,0.3) 0%, transparent 55%)',
        }} />
      </div>

      {/* Contenido encima del fondo */}
      {children}
    </div>
  );
}
