"use client";
import { useState, useEffect, useMemo } from 'react';
import {
  Search, MessageCircle, Facebook, Send,
  X as CloseIcon, Calendar, Tag, Link as LinkIcon, Linkedin
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const XIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function BlogList({ noticias = [] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedNota, setSelectedNota] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && noticias.length > 0) {
        const notaHash = noticias.find(n => n.Clave === hash);
        if (notaHash) setSelectedNota(notaHash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [noticias]);

  const categories = useMemo(() => {
    const cats = noticias.map(n => n.Categoría).filter(Boolean);
    return ['Todos', ...Array.from(new Set(cats))];
  }, [noticias]);

  const filtered = useMemo(() => noticias.filter(n => {
    const matchSearch = !search ||
      n.Titulo?.toLowerCase().includes(search.toLowerCase()) ||
      n.Cuerpo?.toLowerCase().includes(search.toLowerCase()) ||
      n.Categoría?.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Todos' || n.Categoría === selectedCategory;
    return matchSearch && matchCat;
  }), [noticias, search, selectedCategory]);

  const handleShare = (platform, nota, event = null) => {
    if (event) event.stopPropagation();
    const origin = window.location.origin;
    const shareUrl = `${origin}/blog?utm_source=user_share&utm_medium=social#${nota.Clave}`;
    const text = `Mira esta nota en Join: ${nota.Titulo}`;
    const links = {
      ws: `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      tg: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      x: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      in: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(nota.Titulo);
      setTimeout(() => setCopiedId(null), 2000);
      return;
    }
    window.open(links[platform], '_blank');
  };

  const openNota = (nota) => { setSelectedNota(nota); window.location.hash = nota.Clave; };
  const closeNota = () => { setSelectedNota(null); window.history.pushState(null, null, window.location.pathname); };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

      {/* BÚSQUEDA */}
      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 2rem' }}>
        <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} size={18} />
        <input
          type="text"
          placeholder="Buscar por título o categoría..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', paddingLeft: '3rem', paddingRight: '1.5rem',
            paddingTop: '0.875rem', paddingBottom: '0.875rem',
            borderRadius: '9999px', outline: 'none',
            background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)',
            color: 'var(--text-strong)', fontSize: '14px', fontWeight: 500,
          }}
        />
      </div>

      {/* FILTROS POR CATEGORÍA */}
      {categories.length > 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              background: selectedCategory === cat ? '#660033' : 'var(--card-inner-bg)',
              color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(102,0,51,0.35)' : 'none',
              transition: 'all 0.2s',
            }}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* CONTADOR */}
      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        {filtered.length} {filtered.length === 1 ? 'artículo' : 'artículos'}
        {selectedCategory !== 'Todos' ? ` en "${selectedCategory}"` : ''}
      </p>

      {/* GRID DE CARDS */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 600 }}>No se encontraron artículos.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((nota, index) => (
            <article
              key={index}
              className="group"
              style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', cursor: 'pointer' }}
              onClick={() => openNota(nota)}
            >
              {/* IMAGEN */}
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <img
                  src={nota.Imagen?.startsWith('http') ? nota.Imagen : `/images/${nota.Imagen}`}
                  alt={nota.Titulo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                  className="group-hover:scale-105"
                />
                {nota.Categoría && (
                  <span style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: '#660033', color: '#fff',
                    fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
                    padding: '5px 12px', borderRadius: '9999px', whiteSpace: 'nowrap',
                  }}>
                    {nota.Categoría}
                  </span>
                )}
              </div>

              {/* CONTENIDO */}
              <div style={{ padding: '1.75rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', marginBottom: '0.75rem', display: 'block' }}>
                  {nota.Fecha}
                </span>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.4, color: '#111', marginBottom: '0.875rem', transition: 'color 0.2s' }}
                  className="group-hover:text-[#660033]">
                  {nota.Titulo}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {nota.Copete}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={e => { e.stopPropagation(); openNota(nota); }}
                    style={{ fontSize: '12px', fontWeight: 800, color: '#660033', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Leer más →
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={e => handleShare('ws', nota, e)} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', display: 'flex' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                      onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                    >
                      <MessageCircle size={17} />
                    </button>
                    <button onClick={e => handleShare('copy', nota, e)} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex' }}>
                      {copiedId === nota.Titulo && (
                        <span style={{ position: 'absolute', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', background: '#660033', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          Copiado
                        </span>
                      )}
                      <LinkIcon size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* MODAL NOTA COMPLETA */}
      {selectedNota && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 1rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }} onClick={closeNota} />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '900px', maxHeight: '90vh',
            overflowY: 'auto', borderRadius: '1.25rem', background: '#fff', color: '#111',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}>
            <button onClick={closeNota} style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10,
              background: 'rgba(0,0,0,0.2)', color: '#fff', border: 'none', cursor: 'pointer',
              padding: '0.625rem', borderRadius: '50%', display: 'flex', transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
              <CloseIcon size={22} />
            </button>

            <div style={{ height: '280px', position: 'relative' }}>
              <img src={selectedNota.Imagen?.startsWith('http') ? selectedNota.Imagen : `/images/${selectedNota.Imagen}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #fff 0%, transparent 50%)' }} />
            </div>

            <div style={{ padding: '0 2.5rem 4rem', marginTop: '-3rem', position: 'relative' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#660033', color: '#fff', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '5px 14px', borderRadius: '9999px' }}>
                  <Tag size={11} /> {selectedNota.Categoría || 'General'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#999', fontSize: '11px', fontWeight: 600 }}>
                  <Calendar size={12} /> {selectedNota.Fecha}
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: '#111', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                {selectedNota.Titulo}
              </h2>

              <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#333' }}>
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {selectedNota.Cuerpo}
                </ReactMarkdown>
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <p style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#999' }}>Compartir</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                  {[
                    { key: 'ws', bg: '#25D366', icon: <MessageCircle size={20} /> },
                    { key: 'fb', bg: '#1877F2', icon: <Facebook size={20} /> },
                    { key: 'in', bg: '#0077B5', icon: <Linkedin size={20} /> },
                    { key: 'x',  bg: '#000000', icon: <XIcon size={20} /> },
                    { key: 'tg', bg: '#0088cc', icon: <Send size={20} /> },
                  ].map(s => (
                    <button key={s.key} onClick={() => handleShare(s.key, selectedNota)} style={{ background: s.bg, color: '#fff', padding: '0.875rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {s.icon}
                    </button>
                  ))}
                  <button onClick={e => handleShare('copy', selectedNota, e)} style={{ background: '#eee', color: '#333', padding: '0.875rem', borderRadius: '50%', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {copiedId === selectedNota.Titulo && (
                      <span style={{ position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)', background: '#660033', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                        Copiado
                      </span>
                    )}
                    <LinkIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
