import Layout from '../components/layout/Layout';
import PropiedadesList from '../components/sections/PropiedadesList';
import { getAllSiteData } from '../lib/google-sheets';

export default function PropiedadesPage({ data }) {
  if (!data) return null;
  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">
        <header className="max-w-7xl mx-auto px-6 mb-10 text-center md:text-left">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
            Catálogo
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2 transition-colors">
            Encontrá la propiedad que buscás
          </h1>
          <div className="w-24 h-2 bg-primary dark:bg-accent mt-6 rounded-full md:mx-0 mx-auto transition-colors"></div>
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
