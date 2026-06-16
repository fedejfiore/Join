import Layout from '../components/layout/Layout';
import BlogList from '../components/sections/BlogList';
import { getAllSiteData } from '../lib/google-sheets';

export default function BlogPage({ data }) {
  if (!data) return null;

  return (
    <Layout data={data}>
      <div className="min-h-screen" style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>
        <header style={{ maxWidth: '1280px', margin: '0 auto 4rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 0.95, letterSpacing: '-0.04em', marginTop: '0.625rem' }}>
            Blog
          </h1>
          <div style={{ width: '6rem', height: '5px', background: '#660033', margin: '2rem auto 0', borderRadius: '3px' }} />
        </header>

        <BlogList noticias={data.noticias} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data } };
  } catch (e) {
    console.error('Error at blog getServerSideProps:', e);
    return { props: { data: null } };
  }
}
