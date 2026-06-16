"use client";
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Home, ShoppingBag, Calculator, Scale } from 'lucide-react';

const ICON_BTN = [Home, ShoppingBag, Calculator, Scale];
const BTN_DEFAULTS = [
  { label: '¿Querés vender?',   href: '/tasaciones' },
  { label: '¿Querés comprar?',  href: '/propiedades' },
  { label: 'Tasá tu propiedad', href: '/tasaciones' },
  { label: 'Consulta jurídica', href: '/juridico' },
];

export default function HeroJoin({ config, brand }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const videoSrc = config?.video_fondo?.valor || config?.Video_fondo?.valor || '/hero-mobile.mp4';

  const typewriterStrings = [
    config?.typewriter_1?.valor || 'Encontramos tu hogar ideal',
    config?.typewriter_2?.valor || 'Vendemos tu propiedad',
    config?.typewriter_3?.valor || 'Asesoramiento jurídico integral',
  ].filter(Boolean);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 80px)',
      minHeight: '520px',
      overflow: 'hidden',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* VIDEO */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)',
      }} />

      {/* CONTENIDO CENTRAL */}
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '4rem 2rem 2rem',
        maxWidth: '1024px', margin: '0 auto', width: '100%',
      }}>
        <p style={{
          fontSize: '9px', fontWeight: 900, letterSpacing: '10px',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          INMOBILIARIA &amp; ESTUDIO JURÍDICO · BUENOS AIRES
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900,
          textTransform: 'uppercase', color: '#ffffff',
          lineHeight: 1.0, letterSpacing: '-0.03em',
        }}>
          Inmobiliaria y Estudio Jurídico.
          <span style={{
            display: 'block',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
            color: 'rgba(255,255,255,0.75)',
            marginTop: '1rem', fontWeight: 600,
            textTransform: 'none', letterSpacing: 'normal',
          }}>
            Especialistas en Sucesiones y Operaciones Simultáneas.
          </span>
        </h1>

        {mounted && typewriterStrings.length > 0 && (
          <div style={{
            marginTop: '2rem', fontSize: '1rem', fontWeight: 700,
            letterSpacing: '-0.01em', minHeight: '1.75rem', color: '#cc0044',
          }}>
            <Typewriter
              options={{ strings: typewriterStrings, autoStart: true, loop: true, delay: 60, deleteSpeed: 30 }}
            />
          </div>
        )}
      </div>

      {/* ACTION CARDS — fila única */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0, padding: '0 1.5rem 0' }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {BTN_DEFAULTS.map((def, idx) => {
            const Icon = ICON_BTN[idx];
            const item = {
              label: config?.[`hero_btn_${idx + 1}`]?.valor || def.label,
              href:  config?.[`hero_btn_${idx + 1}_href`]?.valor || def.href,
            };
            return (
              <a key={idx} href={item.href}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                  padding: '1.25rem 0.75rem',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '1.125rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                  minWidth: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Icon size={30} strokeWidth={1.5} style={{ color: '#ffffff' }} />
                <span style={{
                  fontSize: '10px', fontWeight: 800,
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center', lineHeight: 1.25,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Línea de transición al fondo de la página */}
      <div style={{ height: '4px', background: '#0f0f0f', position: 'relative', zIndex: 10, flexShrink: 0 }} />
    </section>
  );
}
