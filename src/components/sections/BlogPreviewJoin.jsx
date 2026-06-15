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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#660033', marginBottom: '1rem' }}>Blog</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#111111', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Artículos que te pueden interesar
          </h2>
          <div style={{ width: '64px', height: '3px', background: '#660033', margin: '1.25rem auto 0', borderRadius: '2px' }} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previewList.map((nota, index) => (
            <article
              key={index}
              className="rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}
              onClick={() => handleNotaClick(nota.Clave)}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={nota.Imagen?.startsWith('http') ? nota.Imagen : `/images/${nota.Imagen}`}
                  alt={nota.Titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {nota.Categoría && (
                  <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{ background: '#660033', color: '#fff' }}>
                    {nota.Categoría}
                  </span>
                )}
              </div>

              <div className="p-7 flex-grow flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: '#999' }}>
                  {nota.Fecha}
                </p>
                <h3 className="text-lg font-bold leading-snug mb-3 transition-colors group-hover:text-[#660033]"
                  style={{ color: '#111' }}>
                  {nota.Titulo}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: '#666' }}>
                  {nota.Copete}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-bold" style={{ color: '#660033' }}>
                  Leer más <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-lg"
            style={{ background: '#660033', color: '#fff' }}
          >
            Ver todos los artículos <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
