"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Accessibility } from 'lucide-react';
import AccessibilityHub from '../ui/AccessibilityHub';

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
    <nav className="sticky top-0 w-full z-50 bg-slate-200 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="h-full py-4 shrink-0 flex items-center">
          {logoError ? (
            <span className="font-black text-2xl tracking-[8px] text-primary dark:text-accent select-none">
              JOIN
            </span>
          ) : (
            <>
              <img 
                src="/images/join-logo-color.png" 
                alt="Logo Join" 
                onError={() => setLogoError(true)}
                className="block dark:hidden h-full w-auto object-contain max-h-[60px]" 
              />
              <img 
                src="/images/join-logo-blanco.png" 
                alt="Logo Join" 
                onError={() => setLogoError(true)}
                className="hidden dark:block h-full w-auto object-contain max-h-[60px]" 
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
              className="relative font-bold uppercase text-[12px] tracking-[0.15em] text-slate-700 dark:text-slate-200 group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary dark:bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-6 ml-4 border-l border-slate-200 dark:border-slate-700 pl-8">
            <button 
              onClick={() => setShowAcc(!showAcc)}
              className="text-slate-400 hover:text-primary dark:hover:text-accent transition-colors p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Accesibilidad"
            >
              <Accessibility size={20} className="dark:stroke-[var(--color-accent)]" />
            </button>
          </div>
        </div>

        {/* BOTONES MÓVIL */}
        <div className="md:hidden flex items-center gap-2">
          {setup?.config_accesibilidad?.status === 'ON' && (
            <button onClick={() => setShowAcc(!showAcc)} className="text-primary dark:text-accent p-2">
              <Accessibility size={24} className="dark:stroke-[var(--color-accent)]" />
            </button>
          )}
          <button className="text-primary dark:text-accent p-2 transition-all" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {showAcc && (
        <div className="fixed md:absolute inset-0 md:inset-auto md:right-6 md:top-24 z-[100] flex justify-center items-center md:items-start bg-black/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0">
           <div className="w-full max-w-xs animate-in zoom-in-95 duration-200">
              <AccessibilityHub close={() => setShowAcc(false)} config={accConfig} />
           </div>
        </div>
      )}

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-8 flex flex-col gap-6 animate-in slide-in-from-top-5 shadow-2xl">
          {menuItems.map(item => (
            <Link 
              key={item.id} 
              href={item.href} 
              onClick={() => setIsOpen(false)} 
              className="font-black uppercase text-lg text-primary dark:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}