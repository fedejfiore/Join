import Layout from '../components/layout/Layout';
import BlogList from '../components/sections/BlogList';
import { getAllSiteData } from '../lib/google-sheets';

export default function NovedadesPage({ data }) {
  if (!data) return null;

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
        <header className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
            {data.setup.novedades?.valor || "Actualidad"}
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2 transition-colors">
            Novedades
          </h1>
          <div className="w-24 h-2 bg-primary dark:bg-accent mt-6 rounded-full md:mx-0 mx-auto"></div>
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
    return { props: { data: null } };
  }
}