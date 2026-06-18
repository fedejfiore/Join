"use client";
import { useRef, useEffect } from 'react';

/**
 * Wrapper que aplica efecto parallax JS al fondo de un banner.
 * El fondo se mueve a menor velocidad que el contenido → sensación de profundidad.
 */
export default function ParallaxSection({ children, style = {}, gradient, overlay = true }) {
  const containerRef = useRef(null);
  const bgRef        = useRef(null);

  const bg = gradient || 'linear-gradient(135deg, #1a0010 0%, #660033 50%, #330019 100%)';

  useEffect(() => {
    const container = containerRef.current;
    const bgEl      = bgRef.current;
    if (!container || !bgEl) return;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const vh   = window.innerHeight;
      // progress = 0 cuando sección está abajo, 1 cuando está arriba
      const progress = (vh - rect.top) / (vh + rect.height);
      // El fondo se desplaza ±120px mientras la sección atraviesa el viewport
      bgEl.style.transform = `translateY(${(progress - 0.5) * 240}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick(); // posición inicial
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Capa de fondo — se mueve más lento que el contenido */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '-60%',
          left: 0,
          width: '100%',
          height: '220%',
          background: bg,
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        {overlay && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,0,68,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(102,0,51,0.22) 0%, transparent 60%)',
          }} />
        )}
      </div>

      {/* Contenido — fluye sobre el fondo */}
      {children}
    </div>
  );
}
