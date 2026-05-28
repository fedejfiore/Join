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
    // 1. REGISTRO DE SERVICE WORKER
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log("SW error", err));
    }

    // 2. DETECTAR SI ES PWA YA INSTALADA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isPWA) return;

    // 3. DETECTAR IOS
    const userAgent = window.navigator.userAgent;
    const isApple = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIOS(isApple);

    // 4. LÓGICA PARA ANDROID / CHROME (BeforeInstallPrompt)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!sessionStorage.getItem('pwa_banner_cerrado')) {
        setTimeout(() => setShowInstallBanner(true), 3000);
      }
    });

    // 5. LÓGICA PARA IOS (Manual)
    if (isApple && !sessionStorage.getItem('pwa_banner_cerrado')) {
      setTimeout(() => setShowInstallBanner(true), 3000);
    }

    // 6. LÓGICA DE INSTAGRAM (Deep Linking)
    const esMovil = /Android|iPhone|iPad|iPod/i.test(userAgent);
    if (esMovil) {
      const handleInstaClick = (e) => {
        const target = e.target.closest('a');
        if (target && target.href.includes('instagram.com')) {
          e.preventDefault();
          const urlWeb = target.href;
          const usuario = urlWeb.split('/').filter(Boolean).pop();
          const uriApp = `instagram://user?username=${usuario}`;
          
          window.location.href = uriApp;
          setTimeout(() => {
            window.open(urlWeb, '_blank');
          }, 500);
        }
      };
      document.addEventListener('click', handleInstaClick);
      return () => document.removeEventListener('click', handleInstaClick);
    }
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('Para instalar en tu iPhone:\n1. Toca el botón "Compartir" (el cuadrado con la flecha hacia arriba).\n2. Desliza hacia abajo y elegí "Añadir a la pantalla de inicio".');
      cerrarBanner();
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') cerrarBanner();
      setDeferredPrompt(null);
    }
  };

  const cerrarBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_banner_cerrado', 'true');
  };

  if (!data?.brand || !data?.setup) return null;
  
  const { brand, setup, config_accesibilidad, mkt } = data;
  const gtmId = mkt?.google_tag_manager?.valor;

  const theme = {
    primary: brand.theme_color?.valor || '#0D3B66',
    bg: brand['Color fondo lightmode']?.valor || '#f8fafc',
    nav: brand['Color Nav/Footer lightmode']?.valor || '#ffffff',
    text: brand['Texto lightmode']?.valor || '#0D3B66',
  };

  const whatsappNum = brand.whatsapp_flotante?.valor?.replace(/\D/g, '') || '541178960000';

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{brand.Titulo_Meta?.valor}</title>
        <meta name="description" content={brand.Descripcion_Meta?.valor} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* PWA Tags - IMPORTANTE */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={theme.primary} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Adomus" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      {/* --- GOOGLE TAG MANAGER --- */}
      {mkt?.google_tag_manager?.status === 'ON' && gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      <style jsx global>{`
        :root {
          --primary: ${theme.primary};
          --bg-site: ${theme.bg};
          --nav-footer: ${theme.nav};
          --text-main: ${theme.text};
        }
        body { background-color: var(--bg-site); color: var(--text-main); }
        .bg-primary { background-color: var(--primary) !important; }
        .text-primary { color: var(--primary) !important; }
        .bg-nav-footer { background-color: var(--nav-footer) !important; }
      `}</style>

      {setup.navbar?.status === 'ON' && (
        <Navbar 
          brand={brand} 
          setup={setup} 
          accConfig={config_accesibilidad} 
        />
      )}
      
      <main className="flex-grow">
        {children}
      </main>

      {setup.footer?.status === 'ON' && <Footer brand={brand} />}

      {/* BANNER PWA SMART MODAL */}
      {showInstallBanner && (
        <div className="fixed bottom-24 left-6 right-6 md:left-auto md:right-6 md:w-80 z-[60] bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-5 border border-slate-100 dark:border-slate-800 animate-bounce-subtle">
          <button onClick={cerrarBanner} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Download size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">App Disponible</p>
              <h4 className="text-sm font-bold dark:text-white">
                {isIOS ? 'Añadir a Inicio' : 'Instalar App Domus'}
              </h4>
            </div>
            <button 
              onClick={handleInstallClick}
              className="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter"
            >
              {isIOS ? 'Ver Cómo' : 'Instalar'}
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOTANTE */}
      {brand.whatsapp_flotante?.status === 'ON' && (
        <a 
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <MessageCircle size={32} />
        </a>
      )}
    </div>
  );
}