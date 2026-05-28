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
    const shareUrl = `${origin}/novedades?utm_source=user_share&utm_medium=social#${nota.Clave}`;
    
    const text = `Mira esta noticia en Domus: ${nota.Titulo}`;
    
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
    <section className="py-12 px-6 bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-xl mx-auto mb-16">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Buscar por título o categoría..."
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg outline-none focus:ring-2 focus:ring-accent transition-all dark:text-white font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((nota, index) => (
            <article 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-accent/10 transition-all duration-500 group flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative cursor-pointer" onClick={() => openNota(nota)}>
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">{nota.Fecha}</span>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accent cursor-pointer transition-colors mb-4 line-clamp-2" onClick={() => openNota(nota)}>
                  {nota.Titulo}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 font-medium italic leading-relaxed mb-8">
                  {nota.Copete}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <button onClick={() => openNota(nota)} className="text-primary dark:text-accent font-black italic uppercase text-xs tracking-tighter hover:scale-110 transition-transform">
                    Leer más +
                  </button>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => handleShare('ws', nota, e)} className="text-slate-300 hover:text-[#25D366] transition-colors"><MessageCircle size={18} /></button>
                    <button onClick={(e) => handleShare('copy', nota, e)} className="text-slate-300 hover:text-primary dark:hover:text-accent transition-colors relative">
                       {copiedId === nota.Titulo && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded-md animate-bounce whitespace-nowrap">Copiado</span>}
                      <LinkIcon size={18} />
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
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={closeNota}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300">
            
            <button onClick={closeNota} className="absolute top-6 right-6 z-10 p-3 bg-black/20 text-white rounded-full hover:rotate-90 transition-all backdrop-blur-sm">
              <CloseIcon size={24} />
            </button>

            <div className="h-64 md:h-96 relative">
              <img src={selectedNota.Imagen?.startsWith('http') ? selectedNota.Imagen : `/images/${selectedNota.Imagen}`} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
            </div>

            <div className="px-8 md:px-20 pb-20 -mt-20 relative text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary dark:text-accent bg-accent/10 px-4 py-2 rounded-full">
                  <Tag size={12} /> {selectedNota.Categoría || 'General'}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-2">
                  <Calendar size={12} /> {selectedNota.Fecha}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-accent leading-none mb-10 transition-colors">
                {selectedNota.Titulo}
              </h2>

              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed italic whitespace-pre-wrap font-medium">
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {selectedNota.Cuerpo}
                </ReactMarkdown>
              </div>

              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col items-center gap-6">
                <p className="font-black uppercase tracking-widest text-[11px] text-slate-400 italic">Compartir novedad</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => handleShare('ws', selectedNota)} className="bg-[#25D366] text-white p-4 rounded-full hover:scale-110 shadow-lg shadow-[#25D366]/20 transition-all"><MessageCircle size={22} /></button>
                  <button onClick={() => handleShare('fb', selectedNota)} className="bg-[#1877F2] text-white p-4 rounded-full hover:scale-110 shadow-lg shadow-[#1877F2]/20 transition-all"><Facebook size={22} /></button>
                  <button onClick={() => handleShare('in', selectedNota)} className="bg-[#0077B5] text-white p-4 rounded-full hover:scale-110 shadow-lg shadow-[#0077B5]/20 transition-all"><Linkedin size={22} /></button>
                  <button onClick={() => handleShare('x', selectedNota)} className="bg-black text-white p-4 rounded-full hover:scale-110 shadow-lg shadow-black/20 transition-all"><XIcon size={22} /></button>
                  <button onClick={() => handleShare('th', selectedNota)} className="bg-black p-4 rounded-full hover:scale-110 shadow-lg border border-white/20 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Threads_%28app%29_logo.svg/960px-Threads_%28app%29_logo.svg.png" className="w-5 h-5 invert" alt="Threads" />
                  </button>
                  <button onClick={() => handleShare('tg', selectedNota)} className="bg-[#0088cc] text-white p-4 rounded-full hover:scale-110 shadow-lg shadow-[#0088cc]/20 transition-all"><Send size={22} /></button>
                  <button onClick={(e) => handleShare('copy', selectedNota, e)} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white p-4 rounded-full hover:scale-110 relative transition-all">
                    {copiedId === selectedNota.Titulo && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded animate-bounce whitespace-nowrap">Copiado</span>}
                    <LinkIcon size={22} />
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