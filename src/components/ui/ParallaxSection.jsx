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
      const rect  = container.getBoundingClientRect();
      const vh    = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const shift    = (vh - rect.top) / (vh + rect.height) - 0.5;
      const bgOffset = -shift * 500;

      bg.style.transform      = `translateY(${bgOffset}px)`;
      content.style.transform = `translateY(${-shift * 50}px)`;

      // Sincroniza la posición del gradiente del texto con el fondo
      // Fondo: top=-125% del container, height=350% → gradiente 50% queda en el centro del container
      // Con bgOffset: el gradiente se desplaza. El texto debe seguir exactamente.
      const h = container.offsetHeight;
      content.style.backgroundPositionY = `${-1.25 * h + bgOffset}px`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

      {/* Fondo parallax */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-125%', left: 0,
        width: '100%', height: '350%',
        willChange: 'transform',
        pointerEvents: 'none',
        backgroundImage: [
          'radial-gradient(ellipse 85% 25% at 50% 50%, rgba(204,0,68,0.45) 0%, transparent 55%)',
          'linear-gradient(to bottom, var(--parallax-edge) 0%, var(--parallax-edge) 32%, #660033 37%, #cc0044 47%, #cc0044 53%, #660033 63%, var(--parallax-edge) 68%, var(--parallax-edge) 100%)',
        ].join(', '),
      }} />

      {/*
        Texto con gradiente sincronizado:
        - background-clip: text → el gradiente solo se ve donde hay letras
        - webkit-text-fill-color: transparent → las letras heredan el gradiente del padre
        - Gradiente inverso al fondo: blanco donde hay burdeos, burdeos donde hay negro
        - backgroundPositionY se actualiza en tick() para sincronizarse con el fondo
      */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          willChange: 'transform',
          backgroundImage: 'linear-gradient(to bottom, #cc0044 0%, #cc0044 32%, #ffffff 37%, #ffffff 63%, #cc0044 68%, #cc0044 100%)',
          backgroundSize: '100% 350%',
          backgroundPositionY: '-125%',
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {children}
      </div>

    </div>
  );
}
