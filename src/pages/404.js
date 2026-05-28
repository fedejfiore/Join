import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  // Redirección automática opcional tras 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Ups!</h1>
      <h2 style={styles.subtitle}>Esta página no está disponible actualmente.</h2>
      <p style={styles.text}>
        Es posible que el enlace haya vencido o que la sección esté en mantenimiento. 
        Te invitamos a nuestra página principal para ver cómo podemos ayudarte.
      </p>
      <Link href="/">
        <button style={styles.button}>Ir a la Página Principal</button>
      </Link>
      <p style={styles.footer}>Adomus Administración &copy; {new Date().getFullYear()}</p>
    </div>
  );
}

// Estilos rápidos (puedes reemplazarlos por tus clases de Tailwind si usas)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    padding: '0 20px',
    fontFamily: 'sans-serif'
  },
  title: { fontSize: '4rem', color: '#1e3a8a', marginBottom: '10px' },
  subtitle: { fontSize: '1.5rem', color: '#374151', marginBottom: '20px' },
  text: { color: '#6b7280', maxWidth: '500px', marginBottom: '30px', lineHeight: '1.5' },
  button: {
    padding: '12px 30px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  footer: { marginTop: '50px', fontSize: '0.8rem', color: '#9ca3af' }
};