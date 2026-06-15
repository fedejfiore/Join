import Layout from '../components/layout/Layout';
import PropiedadesList from '../components/sections/PropiedadesList';
import { getAllSiteData } from '../lib/google-sheets';

export default function PropiedadesPage({ data }) {
  if (!data) return null;
  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">
        <header style={{ maxWidth: '1280px', margin: '0 auto 3rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#cc0044' }}>
            Catálogo
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.1, marginTop: '1rem', letterSpacing: '-0.02em' }}>
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
