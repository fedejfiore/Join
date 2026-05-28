import Image from 'next/image';
import { Instagram, Facebook, Mail, MessageCircle, Send, Video } from 'lucide-react';

export default function Footer({ brand }) {
  const cleanPhone = brand?.whatsapp?.valor?.replace(/\D/g, '') || '541178960000';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-200 dark:bg-slate-900 py-12 px-6 border-t border-slate-300 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LADO IZQUIERDO: LOGO Y COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="h-16 w-auto relative">
            <Image 
              src="/images/LOGO-DOMUS---Azul-sobre-transparente.png" 
              alt={brand?.Nombre?.valor || "Logo"} 
              width={200} height={60} 
              className="block dark:hidden h-full w-auto object-contain" 
            />
            <Image 
              src="/images/LOGO-DOMUS---Blanco-sobre-transparente.png" 
              alt={brand?.Nombre?.valor || "Logo"} 
              width={200} height={60} 
              className="hidden dark:block h-full w-auto object-contain" 
            />
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            © {year} {brand?.Nombre?.valor || "Domus"} - Todos los derechos reservados
          </p>
        </div>

        {/* LADO DERECHO: REDES Y MATRÍCULAS */}
        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          
          {/* ICONOS DE REDES SOCIALES */}
          <div className="flex gap-6 transition-colors duration-500">
            {brand?.whatsapp?.status === 'ON' && (
              <a href={`https://wa.me/${cleanPhone}`} target="_blank" className="hover:scale-110 transition-transform">
                <MessageCircle size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Instagram?.status === 'ON' && (
              <a href={`https://instagram.com/${brand.Instagram.valor}`} target="_blank" className="hover:scale-110 transition-transform">
                <Instagram size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Facebook?.status === 'ON' && (
              <a href={`https://facebook.com/${brand.Facebook.valor}`} target="_blank" className="hover:scale-110 transition-transform">
                <Facebook size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Tiktok?.status === 'ON' && (
              <a href={`https://tiktok.com/@${brand.Tiktok.valor}`} target="_blank" className="hover:scale-110 transition-transform">
                <Video size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Telegram?.status === 'ON' && (
              <a href={`https://t.me/${brand.Telegram.valor}`} target="_blank" className="hover:scale-110 transition-transform">
                <Send size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
            {brand?.Mail?.status === 'ON' && (
              <a href={`mailto:${brand.Mail.valor}`} className="hover:scale-110 transition-transform">
                <Mail size={24} className="text-primary dark:text-accent dark:stroke-[var(--color-accent)]" />
              </a>
            )}
          </div>

          {/* INFORMACIÓN DE MATRÍCULAS */}
          <div className="text-[11px] text-center md:text-right font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <p className="text-slate-700 dark:text-accent font-black italic text-sm mb-1 transition-colors">
              Titular: {brand?.titular?.valor || "Juan M. Campos"}
            </p>
            
            {brand?.RPA?.status === 'ON' && (
              <a href={brand.RPA_link?.valor || "#"} target="_blank" className="hover:text-primary dark:hover:text-accent transition-colors block">
                Matrícula R.P.A. CABA N° {brand.RPA.valor}
              </a>
            )}
            
            {brand?.CPACF?.status === 'ON' && (
              <a href={brand.CPACF_link?.valor || "#"} target="_blank" className="hover:text-primary dark:hover:text-accent transition-colors block">
                Matrícula C.P.A.C.F. {brand.CPACF.valor}
              </a>
            )}
          </div>
        </div> {/* <-- Cierre de LADO DERECHO */}
      </div> {/* <-- Cierre de contenedor max-w-7xl */}
    </footer>
  );
}