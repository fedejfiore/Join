import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  // Redirección automática tras 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        padding: '0 20px',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <p
        style={{
          fontSize: '0.6rem',
          fontWeight: 900,
          letterSpacing: '0.4em',
          color: '#5D9CEC',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Error 404
      </p>

      <h1
        style={{
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: 900,
          fontStyle: 'italic',
          textTransform: 'uppercase',
          color: '#0D3B66',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          marginBottom: '8px',
        }}
      >
        ¡Ups!
      </h1>

      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#334155',
          marginBottom: '16px',
          fontStyle: 'italic',
        }}
      >
        Esta página no está disponible actualmente.
      </h2>

      <p
        style={{
          color: '#64748b',
          maxWidth: '480px',
          marginBottom: '40px',
          lineHeight: 1.7,
          fontSize: '0.95rem',
          fontWeight: 500,
        }}
      >
        El enlace puede haber vencido o la sección está en mantenimiento.
        Serás redirigido automáticamente en unos segundos.
      </p>

      <Link href="/">
        <button
          style={{
            padding: '14px 36px',
            backgroundColor: '#0D3B66',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 900,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,59,102,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ir al inicio
        </button>
      </Link>

      <p
        style={{
          marginTop: '60px',
          fontSize: '0.7rem',
          color: '#94a3b8',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Join © {new Date().getFullYear()}
      </p>
    </div>
  );
}