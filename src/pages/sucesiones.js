import Layout from '../components/layout/Layout';
import FAQ from '../components/sections/FAQ';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { FileText, Users, Landmark, Scale, CheckCircle } from 'lucide-react';

export default function SucesionesPage({ data }) {
  if (!data) return null;

  // Filtrar FAQs de la categoría "Sucesiones"
  const faqsSucesiones = (data.faq || []).filter(f => f.Categoría === 'Sucesiones');

  const steps = [
    {
      stepNum: "01",
      title: "Inicio de la Sucesión",
      description: "Recopilación de documentación básica (partidas, títulos) y presentación de la demanda ante el juez competente.",
      icon: FileText
    },
    {
      stepNum: "02",
      title: "Declaratoria de Herederos",
      description: "Publicación de edictos y obtención del pronunciamiento judicial que reconoce formalmente a las personas autorizadas a heredar.",
      icon: Users
    },
    {
      stepNum: "03",
      title: "Inscripción de Bienes / Venta por Tracto Abreviado",
      description: "Pago de tasas judiciales e inscripción de los inmuebles a nombre de los nuevos titulares, o venta simultánea mediante escritura por tracto abreviado.",
      icon: Landmark
    },
    {
      stepNum: "04",
      title: "Adjudicación y Partición",
      description: "Distribución final y adjudicación formal de los bienes de acuerdo con las porciones que correspondan legalmente a cada heredero.",
      icon: Scale
    }
  ];

  const docs = [
    "Acta de defunción del causante.",
    "Partidas de nacimiento de los hijos y partida de matrimonio del cónyuge para acreditar los vínculos.",
    "Títulos de propiedad originales de los bienes inmuebles o muebles registrables a transmitir.",
    "Boletas de ABL / ARBA correspondientes a las propiedades."
  ];

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
        
        {/* HEADER */}
        <header className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
            Estudio Jurídico
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2 transition-colors">
            Gestión de Sucesiones
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-medium italic">
            Facilitamos todo el proceso legal de la sucesión de manera ágil y transparente, coordinando la venta inmediata de las propiedades si así lo deciden.
          </p>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full transition-colors"></div>
        </header>

        {/* PROCESO CRONOLÓGICO */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-16">Etapas del Proceso Sucesorio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group">
                  <span className="absolute top-6 right-8 text-5xl font-black italic text-slate-100 dark:text-slate-850 group-hover:text-primary/10 dark:group-hover:text-accent/10 transition-colors">
                    {step.stepNum}
                  </span>
                  <div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-850 rounded-2xl text-primary dark:text-accent w-fit mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-black italic uppercase text-slate-800 dark:text-slate-100 mb-3 leading-tight">{step.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium italic leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DOCUMENTACION REQUERIDA */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-xl">
            <h2 className="text-3xl font-black italic uppercase text-slate-850 dark:text-slate-100 text-center mb-8">Documentación Requerida</h2>
            <div className="space-y-4 font-medium text-slate-600 dark:text-slate-300 text-sm">
              {docs.map((doc, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle size={20} className="text-primary dark:text-accent shrink-0 mt-0.5" />
                  <p>{doc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        {faqsSucesiones.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mb-24">
            <h2 className="text-3xl md:text-4xl text-center mb-10">Preguntas Frecuentes sobre Sucesiones</h2>
            <FAQ data={faqsSucesiones} />
          </section>
        )}

        {/* CONTACTO */}
        <div id="contacto" className="max-w-7xl mx-auto px-6">
          <ContactoJoin brand={data.brand} defaultTema="Consultar por sucesión" />
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
    console.error("Error at sucesiones getStaticProps:", e);
    return { props: { data: null } };
  }
}
