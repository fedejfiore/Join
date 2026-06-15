import Layout from '../components/layout/Layout';
import FAQ from '../components/sections/FAQ';
import { getAllSiteData } from '../lib/google-sheets';

export default function FAQPage({ data }) {
  if (!data) return null;
  const { faq } = data;

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
        
        {/* ENCABEZADO CENTRADO CON COLORES ACCENT */}
        <header className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
            Ayuda
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2 transition-colors">
            Preguntas Frecuentes
          </h1>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full transition-colors"></div>
        </header>

        {/* LISTADO DE PREGUNTAS */}
        <FAQ data={faq} />

        {/* CTA FINAL CON BOTÓN CELESTE EN DARK */}
        <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
          <div className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl transition-colors">
             <h3 className="text-2xl font-black italic text-primary dark:text-accent uppercase mb-4 transition-colors">
                ¿Tenés más dudas?
             </h3>
             <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium italic">
                Estamos para ayudarte. Ponete en contacto con nosotros.
             </p>
             <a 
               href="/#contacto" 
               className="nav-btn-consorcio px-10 py-4 rounded-2xl font-black uppercase tracking-widest inline-block transition-all hover:scale-105 dark:text-accent"
             >
                Contactar ahora
             </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data } };
  } catch (e) {
    console.error("Error cargando FAQ data:", e);
    return { props: { data: null } };
  }
}