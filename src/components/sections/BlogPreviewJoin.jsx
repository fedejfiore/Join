"use client";
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';

export default function BlogPreviewJoin({ noticias = [] }) {
  const router = useRouter();
  const previewList = noticias.slice(0, 3);

  if (previewList.length === 0) return null;

  const handleNotaClick = (clave) => router.push('/blog#' + clave);

  return (
    <section className="section-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: '#0D3B66' }}>Blog</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#111111' }}>
            Artículos que te pueden interesar
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previewList.map((nota, index) => (
            <article
              key={index}
              className="rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}
              onClick={() => handleNotaClick(nota.Clave)}
            >
              {/* IMAGEN */}
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={nota.Imagen?.startsWith('http') ? nota.Imagen : `/images/${nota.Imagen}`}
                  alt={nota.Titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {nota.Categoría && (
                  <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{ background: '#0D3B66', color: '#fff' }}>
                    {nota.Categoría}
                  </span>
                )}
              </div>

              {/* TEXTO */}
              <div className="p-7 flex-grow flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: '#999' }}>
                  {nota.Fecha}
                </p>
                <h3 className="text-lg font-bold leading-snug mb-3 transition-colors group-hover:text-[#0D3B66]"
                  style={{ color: '#111' }}>
                  {nota.Titulo}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: '#666' }}>
                  {nota.Copete}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-bold" style={{ color: '#0D3B66' }}>
                  Leer más <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-lg"
            style={{ background: '#0D3B66', color: '#fff' }}
          >
            Ver todos los artículos <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
