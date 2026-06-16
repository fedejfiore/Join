"use client";

import { useState, useEffect } from 'react';
import { Type, Contrast, RotateCcw, X, Sun, Moon } from 'lucide-react';

export default function AccessibilityHub({ close, config = {} }) {
  const [fontSize, setFontSize] = useState(100);
  const [isContrast, setIsContrast] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Valores dinámicos desde el Sheet
  const step = parseInt(config?.pasos_aumento?.valor) || 10;
  const showContrast = config?.contraste_alto?.status === 'ON';

  useEffect(() => {
    // Sincronizar estado inicial con las clases del HTML
    setIsDark(document.documentElement.classList.contains('dark'));
    setIsContrast(document.documentElement.classList.contains('high-contrast'));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    
    // 1. Tamaño de fuente
    html.style.fontSize = `${fontSize}%`;
    
    // 2. Alto Contraste
    if (isContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');

    // 3. Dark Mode
    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');

  }, [fontSize, isContrast, isDark]);

  const reset = () => {
    setFontSize(100);
    setIsContrast(false);
    setIsDark(false); // Opcional: resetear también el modo oscuro
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-2xl w-full">
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        <h4 className="font-black italic uppercase text-[10px] text-slate-400 tracking-widest leading-none">Ajustes del Sitio</h4>
        <button onClick={close} className="text-slate-300 hover:text-red-500 transition-colors">
          <X size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {/* MODO OSCURO */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3">
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isDark ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </div>
        </button>

        {/* AUMENTAR TEXTO */}
        <button 
          onClick={() => setFontSize(prev => prev >= 150 ? 100 : prev + step)}
          className={`flex items-center justify-between p-3 rounded-2xl transition-all ${fontSize > 100 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
        >
          <div className="flex items-center gap-3 text-current">
            <Type size={16} />
            <span className="text-xs font-bold">Aumentar Texto</span>
          </div>
          <span className={`text-[9px] font-black ${fontSize > 100 ? 'text-white' : 'text-slate-400'}`}>{fontSize}%</span>
        </button>

        {/* ALTO CONTRASTE */}
        {showContrast && (
          <button 
            onClick={() => setIsContrast(!isContrast)}
            className={`flex items-center justify-between p-3 rounded-2xl transition-all ${isContrast ? 'bg-black text-yellow-400 border-2 border-yellow-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
          >
            <div className="flex items-center gap-3 text-current">
              <Contrast size={16} />
              <span className="text-xs font-bold">Alto Contraste</span>
            </div>
            <span className={`text-[9px] font-black ${isContrast ? 'text-yellow-400' : 'text-slate-400'}`}>{isContrast ? 'ON' : 'OFF'}</span>
          </button>
        )}

        <button onClick={reset} className="mt-2 py-3 text-[9px] font-black uppercase text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <RotateCcw size={12} /> Restablecer
        </button>
      </div>
    </div>
  );
}