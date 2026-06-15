"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Accessibility } from 'lucide-react';
import AccessibilityHub from '../ui/AccessibilityHub';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ brand, setup, accConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAcc, setShowAcc] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const menuItems = [
    { id: 'tasaciones',  label: setup?.tasaciones?.valor  || 'TASACIONES',  href: '/tasaciones' },
    { id: 'propiedades', label: setup?.propiedades?.valor || 'PROPIEDADES', href: '/propiedades' },
    { id: 'sucesiones',  label: setup?.sucesiones?.valor  || 'SUCESIONES',  href: '/sucesiones' },
    { id: 'juridico',    label: setup?.juridico?.valor    || 'JURÍDICO',    href: '/juridico' },
    { id: 'blog',        label: setup?.blog?.valor        || 'BLOG',        href: '/blog' },
  ].filter(item => setup?.[item.id]?.status !== 'OFF');

  return (
    <nav className="sticky top-0 w-full z-50 transition-colors duration-300"
      style={{ backgroundColor: '#111111', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="h-full py-4 shrink-0 flex items-center">
          {logoError ? (
            <span className="font-black text-xl tracking-[10px] text-white select-none">JOIN</span>
          ) : (
            <>
              <img
                src="/images/join-logo-blanco.png"
                alt="Logo Join"
                onError={() => setLogoError(true)}
                className="h-full w-auto object-contain max-h-[48px]"
              />
            </>
          )}
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className="relative font-bold uppercase text-[11px] tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-2 pl-6 border-l border-white/10">
            <ThemeToggle />
            {setup?.config_accesibilidad?.status === 'ON' && (
              <button
                onClick={() => setShowAcc(!showAcc)}
                className="text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Accesibilidad"
              >
                <Accessibility size={18} />
              </button>
            )}
          </div>
        </div>

        {/* BOTONES MÓVIL */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-white/70 hover:text-white p-2 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {showAcc && (
        <div className="fixed md:absolute inset-0 md:inset-auto md:right-6 md:top-20 z-[100] flex justify-center items-center md:items-start bg-black/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0">
          <div className="w-full max-w-xs animate-in zoom-in-95 duration-200">
            <AccessibilityHub close={() => setShowAcc(false)} config={accConfig} />
          </div>
        </div>
      )}

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden border-t border-white/8 p-8 flex flex-col gap-6 animate-in slide-in-from-top-5"
          style={{ backgroundColor: '#111111' }}>
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-black uppercase text-lg text-white/70 hover:text-white transition-colors tracking-widest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
