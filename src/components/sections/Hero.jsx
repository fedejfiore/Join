"use client";

import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

export default function Hero({ config }) {
  // 1. Extraemos los valores exactos del Sheet
  // Usamos el encadenamiento opcional ?.valor porque config es un objeto de objetos
  const titulo = config?.Titulo?.valor || "Administramos tu consorcio con";
  const textoInferior = config?.Texto_inferior?.valor || "";
  const imagenUrl = config?.Imagen_fondo?.valor;
  const rawWords = config?.Texto_dinamico?.valor;

  // 2. Procesamos las palabras para el Typewriter
  const words = (rawWords && typeof rawWords === 'string') 
    ? rawWords.split(',').map(w => w.trim()) 
    : ["Profesionalismo", "Transparencia", "Cercanía", "Eficiencia"];

  return (
    <section
    id="hero-banner"
    className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden px-6 bg-slate-900">
      
      {/* IMAGEN DE FONDO */}
      {imagenUrl && (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={imagenUrl} 
            alt="Fondo Administración Domus"
            fill
            priority
            unoptimized={true} // Obligatorio para links externos dinámicos de Unsplash
            className="object-cover object-center"
            style={{ zIndex: 0 }}
          />
          {/* Capa de contraste para legibilidad */}
          <div className="absolute inset-0 bg-black/60 z-[1]"></div>
        </div>
      )}

      {/* CONTENIDO TEXTUAL */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl">
          {titulo}
          <br />
          <span className="italic inline-block mt-3 text-accent">
            <Typewriter
              options={{
                strings: words,
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 40,
              }}
            />
          </span>
        </h1>

        {textoInferior && (
          <p className="mt-8 text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {textoInferior}
          </p>
        )}

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contacto" 
            className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] inline-block text-sm"
          >
            Pedir Presupuesto
          </a>
          
        </div>
      </div>

      {/* Decoración inferior (Opcional, para suavizar el corte) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-site to-transparent z-[2]"></div>
    </section>
  );
}