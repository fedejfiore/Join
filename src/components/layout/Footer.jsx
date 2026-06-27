import { useState, useEffect } from 'react';
import { Instagram, Facebook, Mail, MessageCircle, Youtube } from 'lucide-react';

const NAV_HREFS = [
  { id: 'tasaciones',  label: 'Tasaciones',  href: '/tasaciones' },
  { id: 'propiedades', label: 'Propiedades', href: '/propiedades' },
  { id: 'sucesiones',  label: 'Sucesiones',  href: '/sucesiones' },
  { id: 'juridico',    label: 'Jurídico',    href: '/juridico' },
  { id: 'blog',        label: 'Blog',        href: '/blog' },
];

export default function Footer({ brand, setup }) {
  const [logoError, setLogoError] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const year = new Date().getFullYear();

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const nombre    = brand?.nombre_empresa?.valor || brand?.Nombre?.valor || 'JOIN';
  const direccion = brand?.direccion?.valor      || brand?.Direccion?.valor || "Mercedes 255 7° 'A', CABA";
  const email     = brand?.email?.valor          || brand?.Mail?.valor || 'hola@ejoin.com.ar';
  const cucicba   = brand?.cucicba?.valor        || brand?.RPA?.valor;
  const cpacf     = brand?.cpacf?.valor          || brand?.CPACF?.valor;
  const titular   = brand?.titular?.valor        || brand?.Titular?.valor;

  const descripcion = brand?.descripcion_corta?.valor
    || 'Inmobiliaria y Estudio Jurídico especializado en Sucesiones y Operaciones Simultáneas en Buenos Aires.';
  const tagline = brand?.tagline?.valor || 'Inmobiliaria y Estudio Jurídico en Buenos Aires';

  const navLinks = NAV_HREFS.filter(l => setup?.[l.id]?.status !== 'OFF');

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

  const logoBlancoSrc = brand?.Logo_Blanco?.valor || brand?.logo_blanco?.valor || '/images/JOIN-Blanco.png';
  const logoColorSrc  = brand?.Logo_Color?.valor  || brand?.logo_color?.valor  || '/images/JOIN---Burdeos (1).png';
  const logoSrc = isDark ? logoBlancoSrc : logoColorSrc;

  return (
    <footer style={{ background: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)', transition: 'background-color 0.3s ease' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* GRID 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COL 1 — LOGO + DESCRIPCION */}
          <div className="flex flex-col gap-5">
            {logoError ? (
              <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '8px', color: 'var(--nav-text-hover)' }}>{nombre}</span>
            ) : (
              <img src={logoSrc} alt={nombre}
                onError={() => setLogoError(true)}
                style={{ height: '44px', width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
            )}
            <p style={{ fontSize: '11px', lineHeight: 1.7, color: 'var(--footer-text-muted)' }}>
              {descripcion}
            </p>
            {(titular || cucicba || cpacf) && (
              <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--footer-text-copy)', lineHeight: 1.8 }}>
                {titular  && <p style={{ marginBottom: '2px', color: 'var(--footer-text-muted)', textTransform: 'none', letterSpacing: '0.05em' }}>{titular}</p>}
                {cucicba  && <p>CUCICBA {cucicba}</p>}
                {cpacf    && <p>CPACF {cpacf}</p>}
              </div>
            )}
          </div>

          {/* COL 2 — CONTACTO */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--footer-text-label)', marginBottom: '4px' }}>Contactanos</p>
            <a href={`tel:${waNum}`} className="flex items-center gap-2 transition-colors"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--footer-text-link)' }}>
              <MessageCircle size={14} /> {waRaw}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--footer-text-link)' }}>
              <Mail size={14} /> {email}
            </a>
            <p className="flex items-start gap-2"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--footer-text-link)' }}>
              <span style={{ marginTop: '2px', flexShrink: 0 }}>📍</span> {direccion}
            </p>
          </div>

          {/* COL 3 — REDES SOCIALES */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--footer-text-label)', marginBottom: '4px' }}>Redes Sociales</p>
            <div className="flex flex-wrap gap-3">
              {showWa && (
                <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'var(--footer-btn-bg)', border: '1px solid var(--footer-btn-border)', color: 'var(--nav-text-hover)' }}>
                  <MessageCircle size={18} />
                </a>
              )}
              {showIg && (
                <a href={igUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'var(--footer-btn-bg)', border: '1px solid var(--footer-btn-border)', color: 'var(--nav-text-hover)' }}>
                  <Instagram size={18} />
                </a>
              )}
              {showFb && (
                <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'var(--footer-btn-bg)', border: '1px solid var(--footer-btn-border)', color: 'var(--nav-text-hover)' }}>
                  <Facebook size={18} />
                </a>
              )}
              {showYt && (
                <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all hover:scale-110"
                  style={{ background: 'var(--footer-btn-bg)', border: '1px solid var(--footer-btn-border)', color: 'var(--nav-text-hover)' }}>
                  <Youtube size={18} />
                </a>
              )}
              <a href={`mailto:${email}`}
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{ background: 'var(--footer-btn-bg)', border: '1px solid var(--footer-btn-border)', color: 'var(--nav-text-hover)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* COL 4 — ACCESOS RÁPIDOS */}
          <div className="flex flex-col gap-4">
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--footer-text-label)', marginBottom: '4px' }}>Accesos rápidos</p>
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="transition-colors"
                style={{ fontSize: '13px', fontWeight: 500, color: 'var(--footer-text-link)' }}>
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--nav-border)' }}>
          <p style={{ fontSize: '10px', fontWeight: 500, color: 'var(--footer-text-copy)' }}>
            © {year} {nombre} — Todos los derechos reservados
          </p>
          <p style={{ fontSize: '10px', fontWeight: 500, color: 'var(--footer-text-copy)' }}>
            {tagline}
          </p>
        </div>

      </div>
    </footer>
  );
}
