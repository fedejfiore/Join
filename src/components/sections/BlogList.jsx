"use client";
import { useState, useEffect } from 'react';
import { 
  Search, MessageCircle, Facebook, Send, 
  X as CloseIcon, Calendar, Tag, Link as LinkIcon, Linkedin
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const XIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export default function BlogList({ noticias }) {
  const [search, setSearch] = useState("");
  const [selectedNota, setSelectedNota] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Lógica para abrir nota si entran con un link directo (ej: #nota-1)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && noticias.length > 0) {
        const notaHash = noticias.find(n => n.Clave === hash);
        if (notaHash) setSelectedNota(notaHash);
      }
    };

    handleHashChange(); // Ejecutar al cargar
    window.addEventListener('hashchange', handleHashChange); // Escuchar cambios manuales
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [noticias]);

  const filtered = noticias.filter(n => 
    n.Titulo?.toLowerCase().includes(search.toLowerCase()) || 
    n.Cuerpo?.toLowerCase().includes(search.toLowerCase()) ||
    n.Categoría?.toLowerCase().includes(search.toLowerCase())
  );

  const handleShare = (platform, nota, event = null) => {
    if (event) event.stopPropagation();
    
    // CONSTRUCCIÓN DE URL ROBUSTA
    const origin = window.location.origin;
    // IMPORTANTE: URL + UTM + HASH (en ese orden exacto para Analytics)
    const shareUrl = `${origin}/blog?utm_source=user_share&utm_medium=social#${nota.Clave}`;
    
    const text = `Mira esta nota en Join: ${nota.Titulo}`;
    
    const links = {
      ws: `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      tg: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      x: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      th: `https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + shareUrl)}`,
      in: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(nota.Titulo);
      setTimeout(() => setCopiedId(null), 2000);
      return;
    }
    window.open(links[platform], '_blank');
  };

  const openNota = (nota) => {
    setSelectedNota(nota);
    // Cambia la URL visualmente al instante
    window.location.hash = nota.Clave;
  };

  const closeNota = () => {
    setSelectedNota(null);
    // Limpia la URL sin recargar la página
    window.history.pushState(null, null, window.location.pathname);
  };

  return (
    <section className="section-light">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-xl mx-auto mb-14">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2" size={20} style={{ color: '#aaa' }} />
          <input
            type="text"
            placeholder="Buscar por título o categoría..."
            className="w-full pl-14 pr-6 py-4 rounded-full outline-none font-medium transition-all"
            style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#111', fontSize: '14px' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((nota, index) => (
            <article
              key={index}
              className="rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}
            >
              <div className="aspect-[16/9] overflow-hidden relative" onClick={() => openNota(nota)}>
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

              <div className="p-7 flex-grow flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: '#999' }}>{nota.Fecha}</span>
                <h3
                  className="text-lg font-bold leading-snug mb-3 transition-colors cursor-pointer"
                  style={{ color: '#111' }}
                  onClick={() => openNota(nota)}
                >
                  {nota.Titulo}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: '#666' }}>
                  {nota.Copete}
                </p>

                <div className="mt-auto pt-5 flex items-center justify-between" style={{ borderTop: '1px solid #f0f0f0' }}>
                  <button onClick={() => openNota(nota)}
                    className="text-xs font-bold flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ color: '#0D3B66' }}>
                    Leer más →
                  </button>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => handleShare('ws', nota, e)} className="transition-colors hover:text-[#25D366]" style={{ color: '#ccc' }}><MessageCircle size={16} /></button>
                    <button onClick={(e) => handleShare('copy', nota, e)} className="transition-colors relative" style={{ color: '#ccc' }}>
                      {copiedId === nota.Titulo && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] py-1 px-2 rounded animate-bounce whitespace-nowrap" style={{ background: '#0D3B66', color: '#fff' }}>Copiado</span>}
                      <LinkIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedNota && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.88)' }} onClick={closeNota} />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            style={{ background: '#fff', color: '#111' }}>

            <button onClick={closeNota}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full hover:rotate-90 transition-all"
              style={{ background: 'rgba(0,0,0,0.15)', color: '#fff' }}>
              <CloseIcon size={22} />
            </button>

            <div className="h-56 md:h-80 relative">
              <img src={selectedNota.Imagen?.startsWith('http') ? selectedNota.Imagen : `/images/${selectedNota.Imagen}`}
                className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="px-8 md:px-16 pb-16 -mt-16 relative">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{ background: '#0D3B66', color: '#fff' }}>
                  <Tag size={12} /> {selectedNota.Categoría || 'General'}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2"
                  style={{ color: '#999' }}>
                  <Calendar size={12} /> {selectedNota.Fecha}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8" style={{ color: '#111' }}>
                {selectedNota.Titulo}
              </h2>

              <div className="prose prose-slate max-w-none text-lg leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {selectedNota.Cuerpo}
                </ReactMarkdown>
              </div>

              <div className="mt-14 pt-8 flex flex-col items-center gap-5" style={{ borderTop: '1px solid #eee' }}>
                <p className="font-bold uppercase tracking-widest text-[11px]" style={{ color: '#999' }}>Compartir</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => handleShare('ws', selectedNota)} className="bg-[#25D366] text-white p-3.5 rounded-full hover:scale-110 shadow-md transition-all"><MessageCircle size={20} /></button>
                  <button onClick={() => handleShare('fb', selectedNota)} className="bg-[#1877F2] text-white p-3.5 rounded-full hover:scale-110 shadow-md transition-all"><Facebook size={20} /></button>
                  <button onClick={() => handleShare('in', selectedNota)} className="bg-[#0077B5] text-white p-3.5 rounded-full hover:scale-110 shadow-md transition-all"><Linkedin size={20} /></button>
                  <button onClick={() => handleShare('x', selectedNota)} className="bg-black text-white p-3.5 rounded-full hover:scale-110 shadow-md transition-all"><XIcon size={20} /></button>
                  <button onClick={() => handleShare('tg', selectedNota)} className="bg-[#0088cc] text-white p-3.5 rounded-full hover:scale-110 shadow-md transition-all"><Send size={20} /></button>
                  <button onClick={(e) => handleShare('copy', selectedNota, e)} className="p-3.5 rounded-full hover:scale-110 relative transition-all"
                    style={{ background: '#eee', color: '#333' }}>
                    {copiedId === selectedNota.Titulo && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] py-1 px-2 rounded animate-bounce whitespace-nowrap" style={{ background: '#0D3B66', color: '#fff' }}>Copiado</span>}
                    <LinkIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}