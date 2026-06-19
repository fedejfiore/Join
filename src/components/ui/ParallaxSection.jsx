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

      // Sincroniza la máscara del texto con el gradiente del fondo
      const posY = `${-1.25 * container.offsetHeight + bgOffset}px`;
      content.style.maskPositionY        = posY;
      content.style.webkitMaskPositionY  = posY;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  // Máscara: blanco = texto visible, negro = texto invisible
  // Coincide con el gradiente del fondo: texto aparece donde está el burdeos
  const MASK = 'linear-gradient(to bottom, black 0%, black 28%, white 38%, white 62%, black 72%, black 100%)';

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', ...style }}>

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

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          willChange: 'transform',
          // El texto aparece y desaparece siguiendo al gradiente burdeos del fondo
          maskImage: MASK,
          WebkitMaskImage: MASK,
          maskSize: '100% 350%',
          WebkitMaskSize: '100% 350%',
          maskPositionY: '-125%',
          WebkitMaskPositionY: '-125%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        {children}
      </div>

    </div>
  );
}
