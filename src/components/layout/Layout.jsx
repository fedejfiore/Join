import Head from 'next/head';
import Script from 'next/script';
import Navbar from './Navbar';
import Footer from './Footer';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toDirectImageUrl } from '../../lib/google-sheets';

export default function Layout({ children, data }) {
  useEffect(() => {
    // Desinstala cualquier Service Worker / cache de versiones anteriores del sitio
    // que hayan quedado activos en el navegador de visitantes recurrentes (PWA dada de baja).
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }

    const userAgent = window.navigator.userAgent;
    const esMovil = /Android|iPhone|iPad|iPod/i.test(userAgent);
    if (esMovil) {
      const handleInstaClick = (e) => {
        const target = e.target.closest('a');
        if (target && target.href.includes('instagram.com')) {
          e.preventDefault();
          const usuario = target.href.split('/').filter(Boolean).pop();
          window.location.href = `instagram://user?username=${usuario}`;
          setTimeout(() => window.open(target.href, '_blank'), 500);
        }
      };
      document.addEventListener('click', handleInstaClick);
      return () => document.removeEventListener('click', handleInstaClick);
    }
  }, []);

  if (!data?.brand || !data?.setup) return null;

  const { brand, setup, config_accesibilidad, mkt } = data;
  const gtmId = mkt?.google_tag_manager?.valor || mkt?.gtm_id?.valor;

  const colorPrimary = brand?.color_primary?.valor || '#660033';
  const colorAccent  = brand?.color_accent?.valor  || '#cc0044';

  // Tipografía configurable desde el Sheet (pestaña brand)
  const heroSize     = brand?.hero_size?.valor     || 'clamp(1.875rem, 5.5vw, 3.75rem)';
  const heroTracking = brand?.hero_tracking?.valor || '0.04em';
  const h1Size       = brand?.h1_size?.valor       || 'clamp(1.75rem, 4.5vw, 3.25rem)';
  const h1Tracking   = brand?.h1_tracking?.valor   || '0.03em';
  const h2Size       = brand?.h2_size?.valor       || 'clamp(1.625rem, 3.5vw, 2.375rem)';
  const h2Tracking   = brand?.h2_tracking?.valor   || '0em';

  const metaTitle = brand?.titulo_meta?.valor || brand?.Titulo_Meta?.valor
    || 'JOIN | Inmobiliaria y Estudio Jurídico en Buenos Aires';
  const metaDesc = brand?.descripcion_meta?.valor || brand?.Descripcion_Meta?.valor
    || '¿Querés vender tu propiedad? ¿Necesitás hacer una sucesión? En JOIN combinamos operaciones inmobiliarias con respaldo legal. Tasaciones profesionales. Especialistas en sucesiones y operaciones encadenadas. Consultanos hoy.';
  const themePrimary = brand?.theme_color?.valor || '#0D3B66';
  const whatsappNum = (brand?.whatsapp?.valor || brand?.whatsapp_flotante?.valor || '541126820000').replace(/\D/g, '');
  const showWhatsapp = brand?.whatsapp?.status === 'ON' || brand?.whatsapp_flotante?.status === 'ON';
  const favicon = toDirectImageUrl(brand?.favicon?.valor) || '/images/JOIN---Burdeos (1).png';

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        <meta name="theme-color" content="#660033" />
        <style>{`:root{--color-primary:${colorPrimary};--color-accent:${colorAccent};--typo-hero-size:${heroSize};--typo-hero-tracking:${heroTracking};--typo-h1-size:${h1Size};--typo-h1-tracking:${h1Tracking};--typo-h2-size:${h2Size};--typo-h2-tracking:${h2Tracking}}`}</style>
      </Head>

      {mkt?.google_tag_manager?.status === 'ON' && gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}

      {setup?.navbar?.status !== 'OFF' && (
        <Navbar brand={brand} setup={setup} accConfig={config_accesibilidad} />
      )}

      <main className="flex-grow">{children}</main>

      {setup?.footer?.status !== 'OFF' && <Footer brand={brand} setup={setup} />}

      {showWhatsapp && (
        <a
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all"
          aria-label="WhatsApp JOIN"
        >
          <MessageCircle size={32} />
        </a>
      )}
    </div>
  );
}
