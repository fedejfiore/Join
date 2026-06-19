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

      // Texto visible con burdeos, desaparece rápido cuando llega el negro
      const absShift = Math.abs(shift);
      const opacity  = Math.max(0, Math.min(1, (0.28 - absShift) / 0.02));
      content.style.opacity = String(opacity);
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

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
        style={{ position: 'relative', zIndex: 1, willChange: 'transform', minHeight: '100%' }}
      >
        {children}
      </div>

    </div>
  );
}
