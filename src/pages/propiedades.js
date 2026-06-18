import Layout from '../components/layout/Layout';
import PropiedadesList from '../components/sections/PropiedadesList';
import { getAllSiteData } from '../lib/google-sheets';

export default function PropiedadesPage({ data }) {
  if (!data) return null;
  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">
        <header style={{ maxWidth: '1280px', margin: '0 auto 3rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.1, letterSpacing: '0.03em' }}>
            Encontrá la propiedad que buscás
          </h1>
          <div style={{ width: '96px', height: '4px', background: '#660033', margin: '1.5rem auto 0', borderRadius: '2px' }} />
        </header>
        <PropiedadesList propiedades={data.propiedades} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data } };
  } catch (e) {
    console.error("Error at properties getServerSideProps:", e);
    return { props: { data: null } };
  }
}
