import { useState } from 'react';
import { Instagram, Facebook, Mail, MessageCircle, Youtube } from 'lucide-react';

export default function Footer({ brand }) {
  const [logoError, setLogoError] = useState(false);
  const year = new Date().getFullYear();

  const nombre    = brand?.nombre_empresa?.valor || brand?.Nombre?.valor || 'JOIN';
  const direccion = brand?.direccion?.valor      || brand?.Direccion?.valor || "Mercedes 255 7° 'A', CABA";
  const email     = brand?.email?.valor          || brand?.Mail?.valor || 'hola@ejoin.com.ar';
  const cucicba   = brand?.cucicba?.valor        || brand?.RPA?.valor;
  const cpacf     = brand?.cpacf?.valor          || brand?.CPACF?.valor;

  const waRaw   = brand?.whatsapp?.valor || brand?.whatsapp_flotante?.valor || '541126820000';
  const waNum   = waRaw.replace(/\D/g, '');

  const igRaw   = brand?.instagram?.valor || brand?.Instagram?.valor || '';
  const fbRaw   = brand?.facebook?.valor  || brand?.Facebook?.valor  || '';
  const ytRaw   = brand?.youtube?.valor   || brand?.Youtube?.valor   || '';

  const igUrl = igRaw ? (igRaw.startsWith('http') ? igRaw : `https://instagram.com/${igRaw}`) : null;
  const fbUrl = fbRaw ? (fbRaw.startsWith('http') ? fbRaw : `https://facebook.com/${fbRaw}`) : null;
  const ytUrl = ytRaw ? (ytRaw.startsWith('http') ? ytRaw : `https://youtube.com/${ytRaw}`) : null;

  const showIg = (brand?.instagram?.status || brand?.Instagram?.status) === 'ON' && igUrl;
  const showFb = (brand?.facebook?.status  || brand?.Facebook?.status)  === 'ON' && fbUrl;
  const showYt = (brand?.youtube?.status   || brand?.Youtube?.status)   === 'ON' && ytUrl;
  const showWa = (brand?.whatsapp?.status  || brand?.whatsapp_flotante?.status) === 'ON';

  return (
    <footer className="bg-slate-200 dark:bg-slate-900 py-12 px-6 border-t border-slate-300 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* LOGO + DATOS */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="h-16 flex items-center">
            {logoError ? (
              <span className="font-black text-2xl tracking-[8px] text-primary dark:text-accent">{nombre}</span>
            ) : (
              <>
                <img src="/images/join-logo-color.png"  alt={nombre} onError={() => setLogoError(true)}
                  className="block dark:hidden h-full w-auto object-contain max-h-[56px]" />
                <img src="/images/join-logo-blanco.png" alt={nombre} onError={() => setLogoError(true)}
                  className="hidden dark:block h-full w-auto object-contain max-h-[56px]" />
              </>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{direccion}</p>
          <a href={`mailto:${email}`} className="text-xs text-slate-600 dark:text-slate-400 font-medium hover:text-primary dark:hover:text-accent transition-colors">
            {email}
          </a>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            © {year} {nombre} — Todos los derechos reservados
          </p>
        </div>

        {/* REDES + MATRÍCULAS */}
        <div className="flex flex-col items-center md:items-end gap-5">
          {/* REDES SOCIALES */}
          <div className="flex gap-5">
            {showWa && (
              <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 transition-transform text-primary dark:text-accent" aria-label="WhatsApp">
                <MessageCircle size={22} />
              </a>
            )}
            {showIg && (
              <a href={igUrl} target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 transition-transform text-primary dark:text-accent" aria-label="Instagram">
                <Instagram size={22} />
              </a>
            )}
            {showFb && (
              <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 transition-transform text-primary dark:text-accent" aria-label="Facebook">
                <Facebook size={22} />
              </a>
            )}
            {showYt && (
              <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 transition-transform text-primary dark:text-accent" aria-label="YouTube">
                <Youtube size={22} />
              </a>
            )}
            <a href={`mailto:${email}`}
              className="hover:scale-110 transition-transform text-primary dark:text-accent" aria-label="Email">
              <Mail size={22} />
            </a>
          </div>

          {/* MATRÍCULAS */}
          <div className="text-[10px] text-right font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 space-y-1">
            {cucicba && <p>CUCICBA {cucicba}</p>}
            {cpacf   && <p>CPACF {cpacf}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
