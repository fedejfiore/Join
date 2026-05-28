"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Accessibility } from 'lucide-react';
import AccessibilityHub from '../ui/AccessibilityHub';

export default function Navbar({ brand, setup, accConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAcc, setShowAcc] = useState(false);

  const menuItems = [
    { id: 'nosotros', label: setup?.nosotros?.valor, show: setup?.nosotros?.status === 'ON' },
    { id: 'proceso', label: setup?.proceso?.valor, show: setup?.proceso?.status === 'ON' },
    { id: 'servicios', label: setup?.servicios?.valor, show: setup?.servicios?.status === 'ON' },
    { id: 'valores', label: setup?.valores?.valor, show: setup?.valores?.status === 'ON' },
    { id: 'novedades', label: setup?.noticias?.valor, show: setup?.noticias?.status === 'ON' },
    { id: 'faq', label: setup?.FAQ?.valor, show: setup?.FAQ?.status === 'ON' },
    { id: 'contacto', label: setup?.contacto?.valor, show: setup?.contacto?.status === 'ON' },
  ].filter(item => item.show && item.label && item.label.trim() !== "");

  // Función mínima para determinar si es página o ancla
  const getHref = (id) => {
    if (id === 'faq') return '/faq';
    if (id === 'novedades') return '/novedades';
    return `/#${id}`;
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-slate-200 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="h-full py-4 shrink-0">
          <Image 
            src="/images/LOGO-DOMUS---Azul-sobre-transparente.png" 
            alt="Logo Domus" 
            width={220} height={70} priority
            className="block dark:hidden h-full w-auto object-contain" 
          />
          <Image 
            src="/images/LOGO-DOMUS---Blanco-sobre-transparente.png" 
            alt="Logo Domus" 
            width={220} height={70} priority
            className="hidden dark:block h-full w-auto object-contain" 
          />
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map(item => (
            <Link 
              key={item.id} 
              href={getHref(item.id)} 
              className="relative font-bold uppercase text-[12px] tracking-[0.15em] text-slate-700 dark:text-slate-200 group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary dark:bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-6 ml-4 border-l border-slate-200 dark:border-slate-700 pl-8">
            <Link 
              href="/mi-consorcio" 
              className="bg-primary dark:bg-accent nav-btn-consorcio text-white dark:text-slate-950 px-7 py-3 rounded-full font-black uppercase text-[11px] tracking-tighter hover:scale-105 transition-all shadow-lg shadow-primary/20 dark:shadow-accent/20"
            >
              Mi Consorcio
            </Link>

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
              href={getHref(item.id)} 
              onClick={() => setIsOpen(false)} 
              className="font-black uppercase text-lg text-primary dark:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="/mi-consorcio" 
            onClick={() => setIsOpen(false)} 
            className="bg-primary dark:bg-accent text-white dark:text-slate-950 w-full text-center py-5 rounded-2xl font-black uppercase text-sm shadow-xl transition-colors"
          >
            Mi Consorcio
          </Link>
        </div>
      )}
    </nav>
  );
}