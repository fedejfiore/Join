"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function PorQueElegirnos({ valores = [] }) {
  const findInArray = (clave) => {
    const item = valores.find(v => v.Clave === clave);
    return item ? item.Valor : "";
  };

  const items = [1, 2, 3].map(num => ({
    titulo: findInArray(`Titulo_${num}`),
    descripcion: findInArray(`Descripcion_${num}`),
    imagen: findInArray(`Imagen_${num}`) || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
  })).filter(item => item.titulo !== "");

  if (items.length === 0) return null;

  return (
    <section id="valores" className="section-dynamic">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-12">¿Por qué elegirnos?</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto -mt-8 mb-16 font-medium italic">
          Porque ofrecemos un servicio integrador y profesional que es escaso en el mercado.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <FlipCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-[480px] w-full [perspective:1000px]">
      <div 
        className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* LADO FRONTAL */}
        <div className="absolute inset-0 h-full w-full rounded-[2.5rem] overflow-hidden shadow-xl [backface-visibility:hidden] border border-slate-200 dark:border-slate-800">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${item.imagen})` }} 
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-[1]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-[10]">
            <h3 className="text-3xl font-black italic uppercase leading-tight mb-6 text-on-image">
              {item.titulo}
            </h3>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-110 transition-all shadow-xl"
            >
              Ver Detalle
            </button>
          </div>
        </div>

        {/* LADO TRASERO */}
        <div className="absolute inset-0 h-full w-full rounded-[2.5rem] bg-primary dark:bg-slate-900 text-white p-10 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] z-[20]">
          <div className="text-sm leading-relaxed text-center mb-8 font-medium">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
              {item.descripcion}
            </ReactMarkdown>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="relative z-[50] mt-auto border-2 border-white/50 text-white px-8 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-primary transition-all pointer-events-auto"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
