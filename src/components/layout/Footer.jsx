import { useState } from 'react';
import { Instagram, Facebook, Mail, MessageCircle, Youtube } from 'lucide-react';

export default function Footer({ brand }) {
  const [logoError, setLogoError] = useState(false);
  const cleanPhone = brand?.whatsapp?.valor?.replace(/\D/g, '') || '541126820000';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-200 dark:bg-slate-900 py-12 px-6 border-t border-slate-300 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LADO IZQUIERDO: LOGO, DIRECCION, MAIL, COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="h-16 w-auto relative flex items-center">
            {logoError ? (
              <span className="font-black text-2xl tracking-[8px] text-primary dark:text-accent select-none">
                JOIN
              </span>
            ) : (
              <>
                <img 
                  src="/images/join-logo-color.png" 
                  alt={brand?.Nombre?.valor || "Logo"} 
                  onError={() => setLogoError(true)}
                  className="block dark:hidden h-full w-auto object-contain max-h-[60px]" 
                />
                <img 
                  src="/images/join-logo-blanco.png" 
                  alt={brand?.Nombre?.valor || "Logo"} 
                  onError={() => setLogoError(true)}
                  className="hidden dark:block h-full w-auto object-contain max-h-[60px]" 
                />
              </>
            )}
          </div>
          {brand?.Direccion?.valor && (
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {brand.Direccion.valor}
            </p>
          )}
          {brand?.Mail?.valor && (
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {brand.Mail.valor}
            </p>
          )}
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            © {year} {brand?.Nombre?.valor || "Join"} - Todos los derechos reservados
          </p>
        </div>

        {/* LADO DERECHO: REDES Y MATRÍCULAS */}
        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          
          {/* ICONOS DE REDES SOCIALES */}
          <div className="flex gap-6 transition-colors duration-500">
            {brand?.whatsapp?.status === 'ON' && (
              <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <MessageCircle size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Instagram?.status === 'ON' && (
              <a href={`https://instagram.com/${brand.Instagram.valor}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Instagram size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Facebook?.status === 'ON' && (
              <a href={`https://facebook.com/${brand.Facebook.valor}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Facebook size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Youtube?.status === 'ON' && brand?.Youtube?.valor && (
              <a href={`https://youtube.com/${brand.Youtube.valor}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Youtube size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Mail?.status === 'ON' && (
              <a href={`mailto:${brand.Mail.valor}`} className="hover:scale-110 transition-transform">
                <Mail size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
          </div>

          {/* INFORMACIÓN DE MATRÍCULAS */}
          <div className="flex flex-col text-[11px] text-center md:text-right font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 gap-1">
            {brand?.titular?.valor && (
              <p className="text-slate-700 dark:text-accent font-black italic text-sm mb-1 transition-colors">
                Titular: {brand.titular.valor}
              </p>
            )}
            {brand?.RPA?.status === 'ON' && <span>CUCICBA N° {brand.RPA.valor}</span>}
            {brand?.CPACF?.status === 'ON' && <span>CPACF {brand.CPACF.valor}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}