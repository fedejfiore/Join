import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function PageEffects() {
  const router = useRouter();

  useEffect(() => {
    let bar = document.getElementById('page-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'page-progress';
      document.body.appendChild(bar);
    }
    const start = () => { bar.style.width = '35%'; bar.style.opacity = '1'; };
    const done  = () => { bar.style.width = '100%'; setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0%'; }, 280); };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router]);

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [router.pathname]);

  useEffect(() => {
    const tick = () => {
      document.querySelectorAll('.parallax-bg').forEach(bg => {
        const parent = bg.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const vh   = window.innerHeight;
        if (rect.bottom < -300 || rect.top > vh + 300) return;
        // Cuánto del recorrido total completó la sección (0=abajo, 1=arriba)
        const progress = (vh - rect.top) / (vh + rect.height);
        // El fondo se mueve ±130px mientras la sección recorre el viewport
        bg.style.transform = `translateY(${(progress - 0.5) * 260}px)`;
      });
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, [router.pathname]);

  return null;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageEffects />
      <Component {...pageProps} />
    </>
  );
}
