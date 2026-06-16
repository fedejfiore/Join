import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 8000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', textAlign: 'center',
      backgroundColor: '#0d0d0d', padding: '0 20px',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <p style={{
        fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.4em',
        color: '#cc0044', textTransform: 'uppercase', marginBottom: '12px',
      }}>
        Error 404
      </p>

      <h1 style={{
        fontSize: 'clamp(4rem, 12vw, 8rem)', fontWeight: 900,
        textTransform: 'uppercase', color: '#ffffff', lineHeight: 1,
        letterSpacing: '-0.05em', marginBottom: '8px',
      }}>
        ¡Ups!
      </h1>

      <div style={{ width: '4rem', height: '4px', background: '#660033', borderRadius: '2px', margin: '0 auto 2rem' }} />

      <h2 style={{
        fontSize: '1.25rem', fontWeight: 700,
        color: 'rgba(255,255,255,0.8)', marginBottom: '16px',
      }}>
        Esta página no está disponible.
      </h2>

      <p style={{
        color: 'rgba(255,255,255,0.45)', maxWidth: '480px',
        marginBottom: '40px', lineHeight: 1.7,
        fontSize: '0.95rem', fontWeight: 500,
      }}>
        El enlace puede haber vencido o la sección está en mantenimiento.
        Serás redirigido al inicio automáticamente.
      </p>

      <Link href="/">
        <button
          style={{
            padding: '14px 36px', backgroundColor: '#660033', color: 'white',
            border: 'none', borderRadius: '9999px', cursor: 'pointer',
            fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em',
            textTransform: 'uppercase', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(102,0,51,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          Ir al inicio
        </button>
      </Link>

      <p style={{
        marginTop: '60px', fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.2)', fontWeight: 700,
        letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        JOIN © {new Date().getFullYear()}
      </p>
    </div>
  );
}
