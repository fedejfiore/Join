"use client";
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';

export default function BlogPreviewJoin({ noticias = [] }) {
  const router = useRouter();
  const previewList = noticias.slice(0, 3);

  if (previewList.length === 0) return null;

  const handleNotaClick = (clave) => router.push('/blog#' + clave);

  return (
    <section className="section-dynamic">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Artículos que te pueden interesar
          </h2>
          <div style={{ width: '64px', height: '3px', background: '#660033', margin: '1.25rem auto 0', borderRadius: '2px' }} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previewList.map((nota, index) => (
            <article
              key={index}
              className="rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
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
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                  {nota.Fecha}
                </p>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.875rem', color: 'var(--text-strong)', transition: 'color 0.2s' }}
                  className="group-hover:text-[#cc0044]">
                  {nota.Titulo}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.75rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {nota.Copete}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', fontWeight: 700, color: '#cc0044' }}>
                  Leer más <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button
            onClick={() => router.push('/blog')}
            style={{ background: '#660033', color: '#fff', padding: '1.1rem 3.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', transition: 'transform 0.2s', boxShadow: '0 4px 20px rgba(102,0,51,0.35)' }}
          >
            Ver todos los artículos <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
