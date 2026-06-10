"use client";
import { useRouter } from 'next/router';

export default function BlogPreviewJoin({ noticias = [] }) {
  const router = useRouter();
  const previewList = noticias.slice(0, 3);

  if (previewList.length === 0) return null;

  const handleNotaClick = (clave) => {
    router.push('/blog#' + clave);
  };

  return (
    <section className="section-dynamic">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 text-center">
          Artículos que te pueden interesar
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {previewList.map((nota, index) => (
            <article 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-accent/10 transition-all duration-500 group flex flex-col"
            >
              <div 
                className="aspect-video overflow-hidden relative cursor-pointer" 
                onClick={() => handleNotaClick(nota.Clave)}
              >
                <img 
                  src={nota.Imagen?.startsWith('http') ? nota.Imagen : `/images/${nota.Imagen}`} 
                  alt={nota.Titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-6 left-6 bg-primary dark:bg-accent text-white dark:text-slate-950 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  {nota.Categoría || 'General'}
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">
                  {nota.Fecha}
                </span>
                <h3 
                  className="text-2xl font-black italic uppercase tracking-tighter leading-tight text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accent cursor-pointer transition-colors mb-4 line-clamp-2" 
                  onClick={() => handleNotaClick(nota.Clave)}
                >
                  {nota.Titulo}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 font-medium italic leading-relaxed mb-8">
                  {nota.Copete}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <button 
                    onClick={() => handleNotaClick(nota.Clave)} 
                    className="text-primary dark:text-accent font-black italic uppercase text-xs tracking-tighter hover:scale-110 transition-transform"
                  >
                    Leer más +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => router.push('/blog')}
            className="bg-primary dark:bg-accent text-white dark:text-slate-950 px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-sm"
          >
            Ver todos los artículos →
          </button>
        </div>
      </div>
    </section>
  );
}
