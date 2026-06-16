"use client";
import SheetText from '../../lib/sheet-text';

export default function About({ data }) {
  const titulo = data?.Titulo?.valor || "Sobre Nosotros";
  const descripcion = data?.Descripcion?.valor || "";
  const imagen = data?.Imagen?.valor;

  return (
    <section id="nosotros" className="section-dynamic pt-32">
      <div className="max-width-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl">
            {titulo}
          </h2>
          <div className="text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none leading-relaxed text-justify">
            <SheetText as="div" text={descripcion} />
          </div>
        </div>
        
        <div className="relative border-4 border-accent rounded-[3rem] p-4 bg-white dark:bg-slate-900 shadow-2xl transition-colors duration-500">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-slate-800">
            {imagen && (
              <img 
                src={imagen} 
                alt={titulo} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}