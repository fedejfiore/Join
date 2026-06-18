"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Accessibility } from 'lucide-react';
import AccessibilityHub from '../ui/AccessibilityHub';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ brand, setup, accConfig }) {
  const [isOpen, setIsOpen]       = useState(false);
  const [showAcc, setShowAcc]     = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDark, setIsDark]       = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const menuItems = [
    { id: 'tasaciones',  label: setup?.tasaciones?.valor  || 'TASACIONES',  href: '/tasaciones' },
    { id: 'propiedades', label: setup?.propiedades?.valor || 'PROPIEDADES', href: '/propiedades' },
    { id: 'sucesiones',  label: setup?.sucesiones?.valor  || 'SUCESIONES',  href: '/sucesiones' },
    { id: 'juridico',    label: setup?.juridico?.valor    || 'JURÍDICO',    href: '/juridico' },
    { id: 'blog',        label: setup?.blog?.valor        || 'BLOG',        href: '/blog' },
  ].filter(item => setup?.[item.id]?.status !== 'OFF');

  const logoBlancoSrc = brand?.Logo_Blanco?.valor || brand?.logo_blanco?.valor || '/images/JOIN-Blanco.png';
  const logoColorSrc  = brand?.Logo_Color?.valor  || brand?.logo_color?.valor  || '/images/JOIN---Burdeos (1).png';
  const logoSrc = isDark ? logoBlancoSrc : logoColorSrc;

  return (
    <nav style={{ position: 'sticky', top: 0, width: '100%', zIndex: 50, backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--nav-border)', transition: 'background-color 0.3s ease, border-color 0.3s ease' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {logoError ? (
            <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '8px', color: 'var(--nav-text-hover)' }}>JOIN</span>
          ) : (
            <img
              key={logoSrc}
              src={logoSrc}
              alt="JOIN"
              onError={() => setLogoError(true)}
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          )}
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative"
              style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.18em', color: 'var(--nav-text)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--nav-text-hover)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--nav-text)'}
            >
              {item.label}
              <span style={{ position: 'absolute', bottom: '-4px', left: 0, height: '1px', background: 'var(--nav-text-hover)', width: 0, transition: 'width 0.3s ease' }}
                className="group-hover:w-full" />
            </Link>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '24px', borderLeft: '1px solid var(--nav-separator)' }}>
            <ThemeToggle />
            {setup?.accesibilidad?.status === 'ON' && (
              <button
                onClick={() => setShowAcc(!showAcc)}
                style={{ color: 'var(--nav-icon)', padding: '8px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Accessibility size={18} />
              </button>
            )}
          </div>
        </div>

        {/* BOTONES MÓVIL — el wrapper no tiene inline display para que md:hidden funcione */}
        <div className="md:hidden">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeToggle />
            {setup?.accesibilidad?.status === 'ON' && (
              <button
                onClick={() => setShowAcc(!showAcc)}
                style={{ color: 'var(--nav-icon)', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Accessibility size={18} />
              </button>
            )}
            <button
              style={{ color: 'var(--nav-text)', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {showAcc && (
        <div className="fixed md:absolute inset-0 md:inset-auto md:right-6 md:top-20 z-[100] flex justify-center items-center md:items-start bg-black/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0">
          <div style={{ width: 'min(440px, calc(100vw - 2rem))', maxHeight: '90vh', overflowY: 'auto' }}>
            <AccessibilityHub close={() => setShowAcc(false)} config={accConfig} />
          </div>
        </div>
      )}

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden" style={{ backgroundColor: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.125rem', color: 'var(--nav-text)', letterSpacing: '0.15em' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
