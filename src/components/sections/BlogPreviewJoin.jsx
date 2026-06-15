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

              <div style={{ padding: '2rem 2.25rem 2.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', marginBottom: '0.875rem' }}>
                  {nota.Fecha}
                </p>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.875rem', color: '#111', transition: 'color 0.2s' }}
                  className="group-hover:text-[#660033]">
                  {nota.Titulo}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', marginBottom: '1.75rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {nota.Copete}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', fontWeight: 700, color: '#660033' }}>
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
