"use client";

import { useState, useEffect } from 'react';
import { Type, Contrast, RotateCcw, X, Sun, Moon } from 'lucide-react';

export default function AccessibilityHub({ close, config = {} }) {
  const [level, setLevel]       = useState(0);   // 0 = normal, 1 = +10%, 2 = +20%, 3 = +30%
  const [isContrast, setIsContrast] = useState(false);
  const [isDark, setIsDark]     = useState(false);

  const showContrast = config?.contraste_alto?.status === 'ON';

  const LEVELS = [100, 110, 120, 130];
  const fontSize = LEVELS[level];

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setIsContrast(document.documentElement.classList.contains('high-contrast'));
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    // Escala el root font-size → afecta todos los valores rem/em
    html.style.fontSize = level === 0 ? '' : `${fontSize}%`;

    // Clase CSS para escalar textos con px hardcodeados
    html.classList.toggle('text-scaled', level > 0);
    html.dataset.textLevel = level;

    if (isContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');

    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [level, isContrast, isDark]);

  const reset = () => {
    setLevel(0);
    setIsContrast(false);
    // no reseteamos dark mode — es una preferencia separada
  };

  return (
    <div style={{
      background: isDark ? '#1c1c1e' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      padding: '1.5rem',
      borderRadius: '1.5rem',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      width: '100%',
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
        <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
          Ajustes del Sitio
        </span>
        <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.color = '#cc0044'}
          onMouseLeave={e => e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}>
          <X size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* MODO OSCURO */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)'}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isDark
              ? <Sun size={16} style={{ color: '#f59e0b' }} />
              : <Moon size={16} style={{ color: '#6366f1' }} />}
            <span style={{ fontSize: '13px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
              {isDark ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </div>
        </button>

        {/* TAMAÑO DE TEXTO */}
        <button
          onClick={() => setLevel(prev => (prev + 1) % LEVELS.length)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.875rem 1rem', borderRadius: '0.875rem', border: 'none', cursor: 'pointer', width: '100%', transition: 'background 0.2s',
            background: level > 0 ? '#660033' : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'),
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Type size={16} style={{ color: level > 0 ? '#fff' : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)') }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: level > 0 ? '#fff' : (isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)') }}>
              Tamaño de Texto
            </span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 900, color: level > 0 ? 'rgba(255,255,255,0.8)' : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)') }}>
            {level === 0 ? 'NORMAL' : `+${level * 10}%`}
          </span>
        </button>

        {/* ALTO CONTRASTE */}
        {showContrast && (
          <button
            onClick={() => setIsContrast(!isContrast)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.875rem 1rem', borderRadius: '0.875rem', border: isContrast ? '2px solid #facc15' : 'none', cursor: 'pointer', width: '100%', transition: 'all 0.2s',
              background: isContrast ? '#000000' : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'),
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Contrast size={16} style={{ color: isContrast ? '#facc15' : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)') }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: isContrast ? '#facc15' : (isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)') }}>
                Alto Contraste
              </span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 900, color: isContrast ? '#facc15' : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)') }}>
              {isContrast ? 'ON' : 'OFF'}
            </span>
          </button>
        )}

        {/* RESTABLECER */}
        <button
          onClick={reset}
          style={{ marginTop: '4px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#cc0044'}
          onMouseLeave={e => e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'}
        >
          <RotateCcw size={12} /> Restablecer
        </button>
      </div>
    </div>
  );
}
