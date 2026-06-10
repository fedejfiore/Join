import Layout from '../components/layout/Layout';
import FAQ from '../components/sections/FAQ';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { Camera, Film, Compass, Layout as StagingIcon } from 'lucide-react';

export default function TasacionesPage({ data }) {
  if (!data) return null;

  // Filtrar FAQs de la categoría "Tasaciones"
  const faqsTasaciones = (data.faq || []).filter(f => f.Categoría === 'Tasaciones');

  const cards = [
    {
      title: "Fotografía Profesional y de Altura (dron)",
      description: "Capturamos las mejores perspectivas de tu propiedad, destacando sus espacios interiores y su ubicación con tomas aéreas de alta calidad.",
      icon: Camera
    },
    {
      title: "Video Recorrido Cinematográfico",
      description: "Producimos videos dinámicos y atractivos para que los posibles compradores realicen una visita virtual inmersiva y fluida.",
      icon: Film
    },
    {
      title: "Tour Virtual 360° en Alta Definición",
      description: "Permite que los interesados recorran cada ambiente detalladamente desde cualquier dispositivo, reduciendo visitas innecesarias.",
      icon: Compass
    },
    {
      title: "Amoblamiento Virtual / Staging",
      description: "Visualizamos el máximo potencial de ambientes vacíos o a refaccionar mediante diseño 3D realista y decoración digital.",
      icon: StagingIcon
    }
  ];

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
        
        {/* HEADER */}
        <header className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
            Servicios
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2 transition-colors">
            Tasaciones Profesionales
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-medium italic">
            Tasamos con precisión basándonos en datos reales del mercado y brindamos un plan de marketing de vanguardia para comercializar tu propiedad.
          </p>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full transition-colors"></div>
        </header>

        {/* VALOR AGREGADO CARDS */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-16">Nuestra Propuesta de Valor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-all duration-300">
                  <div className="p-4 bg-slate-100 dark:bg-slate-850 rounded-2xl text-primary dark:text-accent shrink-0">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase text-slate-800 dark:text-slate-100 mb-2 leading-tight">{card.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ACCORDION FAQ */}
        {faqsTasaciones.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mb-24">
            <h2 className="text-3xl md:text-4xl text-center mb-10">Preguntas Frecuentes sobre Tasaciones</h2>
            <FAQ data={faqsTasaciones} />
          </section>
        )}

        {/* CONTACTO */}
        <div id="contacto" className="max-w-7xl mx-auto px-6">
          <ContactoJoin brand={data.brand} defaultTema="Pedir una tasación" />
        </div>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data }, revalidate: 10 };
  } catch (e) {
    console.error("Error at tasaciones getStaticProps:", e);
    return { props: { data: null } };
  }
}
