"use client";
import { useRef, useEffect, useState } from 'react';

/**
 * Sección parallax con efecto "cuadro congelado":
 * - La sección se adhiere (sticky) al viewport mientras el resto de la página sigue scrolleando
 * - El fondo se mueve internamente de forma sutil, creando la sensación de profundidad
 */
export default function ParallaxSection({ children, style = {}, stickyTop = 88 }) {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);
  const [sectionH, setSectionH] = useState(0);

  // Medir altura real de la sección después de renderizar
  useEffect(() => {
    if (sectionRef.current) setSectionH(sectionRef.current.offsetHeight);
  }, []);

  // Parallax interno: fondo ±60px, texto ±15px dentro de la sección congelada
  useEffect(() => {
    const bg      = bgRef.current;
    const content = contentRef.current;
    const section = sectionRef.current;
    if (!bg || !content || !section) return;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      // progress 0→1 mientras la sección está visible y "congelada"
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const shift = (progress - 0.5);
      bg.style.transform      = `translateY(${shift * 120}px)`;
      content.style.transform = `translateY(${shift * 28}px)`;
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, [sectionH]);

  // Espacio extra para que la sección quede "congelada" durante más scroll
  const spacer = sectionH > 0 ? sectionH * 1.8 : 0;

  return (
    <div style={{
      position: 'relative',
      // El spacer extra es lo que da la ilusión de que la sección se queda quieta
      height: sectionH > 0 ? sectionH + spacer : 'auto',
      ...Object.fromEntries(
        Object.entries(style).filter(([k]) => ['marginTop','marginBottom','margin'].includes(k))
      ),
    }}>
      {/* Sección sticky: se adhiere al viewport mientras el spacer scrollea */}
      <div
        ref={sectionRef}
        style={{
          position: sectionH > 0 ? 'sticky' : 'relative',
          top: sectionH > 0 ? stickyTop : 0,
          overflow: 'hidden',
          ...Object.fromEntries(
            Object.entries(style).filter(([k]) => !['marginTop','marginBottom','margin'].includes(k))
          ),
        }}
      >
        {/* FONDO — se mueve lentamente dentro del cuadro congelado */}
        <div ref={bgRef} style={{
          position: 'absolute',
          top: '-50%', left: 0,
          width: '100%', height: '200%',
          willChange: 'transform',
          pointerEvents: 'none',
          backgroundImage: [
            'repeating-linear-gradient(-55deg, transparent 0px, transparent 18px, rgba(255,255,255,0.02) 18px, rgba(255,255,255,0.02) 19px)',
            'radial-gradient(ellipse 70% 35% at 50% 30%, rgba(204,0,68,0.30) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 25% at 50% 75%, rgba(102,0,51,0.35) 0%, transparent 60%)',
            'linear-gradient(to bottom, #04000a 0%, #1e0014 15%, #660033 38%, #99003d 50%, #660033 62%, #1e0014 85%, #04000a 100%)',
          ].join(', '),
        }} />

        {/* CONTENIDO — se mueve muy poco, casi estático */}
        <div ref={contentRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
