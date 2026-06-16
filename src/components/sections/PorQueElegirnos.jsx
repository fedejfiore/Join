"use client";
import { useState, useEffect, useRef } from 'react';
import { getIcon } from '../../lib/icon-map';

// ── Fallbacks ──────────────────────────────────────────────────────────────
const DEFAULT_RAZONES = [
  {
    Numero: '01', Icono: 'Shield', Titulo: 'Mayor Seguridad Jurídica',
    Intro: 'Tu tranquilidad no es un accesorio, es nuestra prioridad absoluta. A diferencia del modelo tradicional, en JOIN somos la inmobiliaria y el estudio jurídico en una sola estructura. Esta integración nos permite actuar con velocidad y precisión en cada etapa de la operación.',
    items: [
      { Titulo: 'Acelerar procesos complejos',       Texto: 'Estudiamos las particularidades de cada caso, exploramos las alternativas viables y accionamos su implementación de forma inmediata.' },
      { Titulo: 'Viabilizar operaciones difíciles',  Texto: 'Analizamos y destrabamos casos que otras agencias suelen rechazar por falta de especialización técnica en derecho inmobiliario.' },
      { Titulo: 'Garantizar cierres seguros',        Texto: 'Cada documento que firmás cuenta con el respaldo de expertos que comprenden tanto el mercado inmobiliario como el marco legal que lo rige.' },
    ],
  },
  {
    Numero: '02', Icono: 'Camera', Titulo: 'Comercialización de Vanguardia',
    Intro: 'Utilizamos tecnología para transformar cada inmueble en una experiencia inmersiva para los compradores y acelerar la toma de decisiones. En el mercado actual, la producción multimedia de alta calidad es indispensable.',
    items: [
      { Titulo: 'Fotografía de Alta Calidad', Texto: 'Capturamos la esencia y los mejores ángulos de tu propiedad con equipos de nivel editorial, garantizando una primera impresión inmejorable.' },
      { Titulo: 'Video Recorrido',            Texto: 'Realizamos piezas audiovisuales dinámicas que permiten al interesado "caminar" la propiedad desde su dispositivo, generando un vínculo emocional inmediato.' },
      { Titulo: 'Tour Virtual 360°',          Texto: 'Permitimos inspeccionar cada rincón de la propiedad con total libertad, las 24 horas del día, desde cualquier lugar del mundo.' },
    ],
  },
  {
    Numero: '03', Icono: 'Users', Titulo: 'Socio Estratégico',
    Intro: 'No solo gestionamos propiedades; resolvemos los obstáculos legales que te impiden disponer de ellas. Somos el aliado clave para quienes necesitan iniciar una sucesión como paso previo obligatorio para concretar una venta.',
    items: [
      { Titulo: 'Interlocutor Único',        Texto: 'Se evitan los "teléfonos descompuestos" entre profesionales. Nos encargamos de todo el ciclo: desde el inicio de la sucesión hasta la firma de la escritura traslativa de dominio.' },
      { Titulo: 'Facilidad de Honorarios',   Texto: 'Apostamos al resultado y alineamos nuestros incentivos con los tuyos. Nuestros honorarios profesionales se cancelan al concretar la operación inmobiliaria.' },
      { Titulo: 'Especialización',           Texto: 'No somos generalistas. Somos expertos en sucesiones, lo que nos permite anticiparnos a los conflictos y acelerar los plazos mediante herramientas como el tracto abreviado.' },
    ],
  },
];

const INTERVAL = 9000;

export default function PorQueElegirnos({ valores = [], valores_items = [] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Combina datos del sheet con fallback
  const razones = valores.length
    ? valores.map(r => ({
        ...r,
        items: valores_items.filter(it => it.Razon_Num === r.Numero),
      }))
    : DEFAULT_RAZONES;

  useEffect(() => {
    if (isPaused || razones.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % razones.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [isPaused, active, razones.length]);

  const selectTab = (i) => {
    setActive(i);
    clearInterval(timerRef.current);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), INTERVAL * 2);
  };

  const razon = razones[active] || razones[0];
  const Icon = getIcon(razon?.Icono);

  return (
    <section id="valores" className="section-dynamic"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div className="section-inner">

        {/* ENCABEZADO */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text-strong)', marginBottom: '1.25rem' }}>
            ¿Por qué elegirnos?
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Porque ofrecemos un servicio integrador y profesional que es escaso en el mercado inmobiliario y genera ahorros y agilidad a nuestros clientes.
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {razones.map((r, i) => {
            const I = getIcon(r.Icono);
            const isActive = active === i;
            return (
              <button key={i} onClick={() => selectTab(i)} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 24px', borderRadius: '12px', transition: 'all 0.3s ease', cursor: 'pointer',
                background: isActive ? '#660033' : 'var(--card-inner-bg)',
                border: `1px solid ${isActive ? '#660033' : 'var(--card-inner-border)'}`,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                boxShadow: isActive ? '0 4px 20px rgba(102,0,51,0.4)' : 'none',
              }}>
                <I size={17} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.12em', lineHeight: 1.3 }}>
                  {r.Numero}. {r.Titulo}
                </span>
              </button>
            );
          })}
        </div>

        {/* INDICADOR */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '2rem' }}>
          {razones.map((_, i) => (
            <div key={i} onClick={() => selectTab(i)} style={{
              width: active === i ? '28px' : '8px', height: '4px', borderRadius: '2px',
              background: active === i ? '#660033' : 'var(--card-inner-border)',
              transition: 'all 0.4s ease', cursor: 'pointer',
            }} />
          ))}
        </div>

        {/* PANEL */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2.5rem 3rem', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--divider)' }}>
            <div style={{ padding: '14px', borderRadius: '12px', flexShrink: 0, background: 'rgba(102,0,51,0.12)', color: '#cc0044' }}>
              <Icon size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: 'var(--text-strong)', marginBottom: '10px' }}>
                {razon.Titulo}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '700px' }}>
                {razon.Intro}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(razon.items || []).map((item, i) => (
              <div key={i} style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', borderRadius: '12px', padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, flexShrink: 0, background: '#660033', color: '#ffffff' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-strong)', lineHeight: 1.3 }}>{item.Titulo}</p>
                </div>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{item.Texto}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
