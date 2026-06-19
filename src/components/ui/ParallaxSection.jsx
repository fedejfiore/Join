"use client";
import { useRef, useEffect } from 'react';

/**
 * Sección "pinned": se queda fija mientras el resto de la página sigue scrolleando.
 * El wrapper invisible ocupa 2.5x la altura y da espacio de scroll.
 * Mientras la sección está fija, el fondo se desplaza sutilmente (parallax interno).
 */
export default function ParallaxSection({ children, style = {} }) {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const wrapper  = wrapperRef.current;
    const section  = sectionRef.current;
    const bg       = bgRef.current;
    const content  = contentRef.current;
    if (!wrapper || !section || !bg || !content) return;

    // El wrapper toma 2.5x la altura de la sección para dar espacio de scroll
    const h = section.offsetHeight;
    wrapper.style.height = `${h * 2.5}px`;

    const tick = () => {
      const wr   = wrapper.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (wr.bottom < 0 || wr.top > vh) return;

      // Progreso dentro del período "pinned" (0 cuando entra, 1 cuando sale)
      const progress = Math.max(0, Math.min(1, (vh - wr.top) / (wr.height + vh)));
      const shift    = progress - 0.5;

      // Movimiento sutil del fondo mientras la sección está congelada
      bg.style.transform      = `translateY(${shift * 100}px)`;
      content.style.transform = `translateY(${shift * 25}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  // Separar margin del resto del style (margin va en el wrapper, no en la sección sticky)
  const { margin, marginTop, marginBottom, marginLeft, marginRight, ...sectionStyle } = style;

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', margin, marginTop, marginBottom, marginLeft, marginRight }}
    >
      <div
        ref={sectionRef}
        style={{
          position: 'sticky',
          top: '88px',                    // debajo del navbar
          clipPath: 'inset(0)',           // recorta el fondo extendido sin bloquear sticky
          WebkitClipPath: 'inset(0)',
          overflow: 'hidden',
          ...sectionStyle,
        }}
      >
        {/* Fondo que se mueve suavemente mientras la sección está pinned */}
        <div ref={bgRef} style={{
          position: 'absolute',
          top: '-60%', left: 0,
          width: '100%', height: '220%',
          willChange: 'transform',
          pointerEvents: 'none',
          backgroundImage: [
            'repeating-linear-gradient(-50deg, transparent 0px, transparent 22px, rgba(255,255,255,0.022) 22px, rgba(255,255,255,0.022) 23px)',
            'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(204,0,68,0.4) 0%, transparent 60%)',
            'linear-gradient(135deg, #1a0010 0%, #660033 50%, #330019 100%)',
          ].join(', '),
        }} />

        {/* Contenido */}
        <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
