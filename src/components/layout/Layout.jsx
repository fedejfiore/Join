import Head from 'next/head';
import Script from 'next/script';
import Navbar from './Navbar';
import Footer from './Footer';
import { MessageCircle, X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout({ children, data }) {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isPWA) return;
    const userAgent = window.navigator.userAgent;
    const isApple = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIOS(isApple);
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!sessionStorage.getItem('pwa_banner_cerrado')) {
        setTimeout(() => setShowInstallBanner(true), 3000);
      }
    });
    if (isApple && !sessionStorage.getItem('pwa_banner_cerrado')) {
      setTimeout(() => setShowInstallBanner(true), 3000);
    }
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

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('Para instalar en tu iPhone:\n1. Toca el botón "Compartir".\n2. Elegí "Añadir a la pantalla de inicio".');
      cerrarBanner();
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      cerrarBanner();
      setDeferredPrompt(null);
    }
  };

  const cerrarBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_banner_cerrado', 'true');
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/images/JOIN---Burdeos (1).png" />
        <link rel="apple-touch-icon" href="/images/JOIN---Burdeos (1).png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#660033" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JOIN" />
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

      {showInstallBanner && (
        <div className="fixed bottom-24 left-6 right-6 md:left-auto md:right-6 md:w-80 z-[60] bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-5 border border-slate-100 dark:border-slate-800">
          <button onClick={cerrarBanner} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Download size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">App Disponible</p>
              <h4 className="text-sm font-bold dark:text-white">{isIOS ? 'Añadir a Inicio' : 'Instalar App JOIN'}</h4>
            </div>
            <button onClick={handleInstallClick} className="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">
              {isIOS ? 'Ver Cómo' : 'Instalar'}
            </button>
          </div>
        </div>
      )}

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
