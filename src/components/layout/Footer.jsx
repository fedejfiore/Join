import { useState } from 'react';
import { Instagram, Facebook, Mail, MessageCircle, Youtube } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Tasaciones',  href: '/tasaciones' },
  { label: 'Propiedades', href: '/propiedades' },
  { label: 'Sucesiones',  href: '/sucesiones' },
  { label: 'Jurídico',    href: '/juridico' },
  { label: 'Blog',        href: '/blog' },
];

export default function Footer({ brand }) {
  const [logoError, setLogoError] = useState(false);
  const year = new Date().getFullYear();

  const nombre    = brand?.nombre_empresa?.valor || brand?.Nombre?.valor || 'JOIN';
  const direccion = brand?.direccion?.valor      || brand?.Direccion?.valor || "Mercedes 255 7° 'A', CABA";
  const email     = brand?.email?.valor          || brand?.Mail?.valor || 'hola@ejoin.com.ar';
  const cucicba   = brand?.cucicba?.valor        || brand?.RPA?.valor;
  const cpacf     = brand?.cpacf?.valor          || brand?.CPACF?.valor;

  const waRaw = brand?.whatsapp?.valor || brand?.whatsapp_flotante?.valor || '541126820000';
  const waNum = waRaw.replace(/\D/g, '');

  const igRaw = brand?.instagram?.valor || brand?.Instagram?.valor || '';
  const fbRaw = brand?.facebook?.valor  || brand?.Facebook?.valor  || '';
  const ytRaw = brand?.youtube?.valor   || brand?.Youtube?.valor   || '';

  const igUrl = igRaw ? (igRaw.startsWith('http') ? igRaw : `https://instagram.com/${igRaw}`) : null;
  const fbUrl = fbRaw ? (fbRaw.startsWith('http') ? fbRaw : `https://facebook.com/${fbRaw}`) : null;
  const ytUrl = ytRaw ? (ytRaw.startsWith('http') ? ytRaw : `https://youtube.com/${ytRaw}`) : null;

  const showIg = (brand?.instagram?.status || brand?.Instagram?.status) === 'ON' && igUrl;
  const showFb = (brand?.facebook?.status  || brand?.Facebook?.status)  === 'ON' && fbUrl;
  const showYt = (brand?.youtube?.status   || brand?.Youtube?.status)   === 'ON' && ytUrl;
  const showWa = (brand?.whatsapp?.status  || brand?.whatsapp_flotante?.status) === 'ON';

  // Logo desde Sheet o fallback
  const logoSrc = brand?.Logo_Blanco?.valor || brand?.logo_blanco?.valor || '/images/JOIN-Blanco.png';

  return (
    <footer style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* GRID 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COL 1 — LOGO + DESCRIPCION */}
          <div className="flex flex-col gap-5">
            {logoError ? (
              <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '8px', color: '#ffffff' }}>{nombre}</span>
            ) : (
              <img src={logoSrc} alt={nombre}
                onError={() => setLogoError(true)}
                style={{ height: '44px', width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
            )}
            <p style={{ fontSize: '11px', lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>
              Inmobiliaria y Estudio Jurídico especializado en Sucesiones y Operaciones Simultáneas en Buenos Aires.
            </p>
            {(cucicba || cpacf) && (
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
                {cucicba && <p>CUCICBA {cucicba}</p>}
                {cpacf   && <p>CPACF {cpacf}</p>}
              </div>
            )}
          </div>

          {/* COL 2 — CONTACTO */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.55)', marginBottom: '4px' }}>Contactanos</p>
            <a href={`tel:${waNum}`} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
              <MessageCircle size={14} /> {waRaw}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
              <Mail size={14} /> {email}
            </a>
            <p className="flex items-start gap-2"
              style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ marginTop: '2px', flexShrink: 0 }}>📍</span> {direccion}
            </p>
          </div>

          {/* COL 3 — REDES SOCIALES */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.55)', marginBottom: '4px' }}>Redes Sociales</p>
            <div className="flex flex-wrap gap-3">
              {showWa && (
                <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <MessageCircle size={18} />
                </a>
              )}
              {showIg && (
                <a href={igUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <Instagram size={18} />
                </a>
              )}
              {showFb && (
                <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <Facebook size={18} />
                </a>
              )}
              {showYt && (
                <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <Youtube size={18} />
                </a>
              )}
              <a href={`mailto:${email}`}
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* COL 4 — ACCESOS RÁPIDOS */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.55)', marginBottom: '4px' }}>Accesos rápidos</p>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="transition-colors hover:text-white"
                style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.25)' }}>
            © {year} {nombre} — Todos los derechos reservados
          </p>
          <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.2)' }}>
            Inmobiliaria y Estudio Jurídico en Buenos Aires
          </p>
        </div>

      </div>
    </footer>
  );
}
