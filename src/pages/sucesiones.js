import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { MessageSquare, Zap, DollarSign, Search, FileText, Users, Home, Receipt, ChevronDown, ChevronUp } from 'lucide-react';

const POR_QUE_ITEMS = [
  {
    icon: Users,
    titulo: 'Interlocutor Único',
    texto: 'Un solo contacto para todo el proceso, desde el juzgado hasta la escritura. Se evitan los "teléfonos descompuestos" entre profesionales y se eliminan las demoras por falta de coordinación.',
  },
  {
    icon: Zap,
    titulo: 'Aceleración de Plazos',
    texto: 'Utilizamos herramientas como el Tracto Abreviado para que la propiedad llegue al mercado en tiempo récord, sin necesidad de doble inscripción registral.',
  },
  {
    icon: DollarSign,
    titulo: 'Honorarios contra Venta',
    texto: 'Nuestro mayor compromiso es el resultado. Iniciamos los trámites sin desembolsos previos de honorarios profesionales; los mismos se cancelan al concretar la operación inmobiliaria.',
  },
];

const PROCESO_ITEMS = [
  {
    num: '01',
    titulo: 'Consulta Inicial y Diagnóstico',
    texto: 'Agendamos una reunión (presencial o virtual) para conocer tu caso y establecer las bases de la solución.',
  },
  {
    num: '02',
    titulo: 'Estrategia Legal y Auditoría',
    texto: 'Analizamos el contexto familiar y jurídico del inmueble para trazar una hoja de ruta que destrabe cualquier obstáculo.',
  },
  {
    num: '03',
    titulo: 'Propuesta Integral',
    texto: 'Te presentamos un plan que incluye la gestión legal y comercial, bajo nuestro modelo de Honorarios contra la venta o plan de pago (si no necesitás vender).',
  },
  {
    num: '04',
    titulo: 'Documentación e Inicio',
    texto: 'Con tu aprobación, recolectamos la documentación necesaria e iniciamos formalmente el expediente judicial y el plan de comercialización del inmueble.',
  },
];

const DOC_ITEMS = [
  { icon: FileText, titulo: 'Partida de Defunción (Original)',    texto: 'Del causante, obtenida en el Registro Civil.' },
  { icon: Users,    titulo: 'Partidas de vínculo',                 texto: 'Nacimiento, matrimonio o testamento para acreditar los lazos con el causante.' },
  { icon: Home,     titulo: 'Título de Propiedad',                 texto: 'Original o copia del bien inmueble a transmitir.' },
  { icon: Receipt,  titulo: 'Boleta de Impuesto Inmobiliario',     texto: 'ABL / ARBA u organismo de recaudación correspondiente.' },
];

const FAQ_ITEMS = [
  {
    q: '¿Cuánto tiempo tarda el trámite judicial de la sucesión?',
    a: 'Tenemos casos en que la declaratoria de herederos se dictó en solo 2 meses desde el inicio del proceso. Pero no hay un tiempo estipulado: la relación entre los coherederos, el estado de la documentación y las diligencias del juzgado y registros son factores que pueden modificar sustancialmente los plazos.',
  },
  {
    q: '¿Todos los herederos tienen que hacer la sucesión con el mismo abogado?',
    a: 'No, no es obligatorio y cada uno puede presentarse con un abogado distinto. Hay situaciones que lo ameritan, pero encarecen y alargan el proceso. Si entre los herederos hay buena relación, presentarse con un mismo abogado suele ser menos costoso y más ágil.',
  },
  {
    q: '¿Puedo iniciar la sucesión si algún heredero se niega a iniciarla?',
    a: 'Sí y suele ser lo más recomendable para cuidar tus derechos. Quien inicia la sucesión debe denunciar la existencia de otros herederos, y se los notifica para que se presenten a hacer valer sus derechos.',
  },
  {
    q: '¿Puedo vender un inmueble si aún no se dictó la declaratoria de herederos?',
    a: 'Para vender un inmueble heredado es necesario contar previamente con la declaratoria de herederos (en sucesiones ab-intestato) o la declaración de validez formal del testamento. No obstante, en algunos casos se puede iniciar la propuesta de comercialización mientras el proceso judicial avanza, para ganar tiempo.',
  },
  {
    q: '¿Qué es el Tracto Abreviado?',
    a: 'Es una herramienta legal que permite vender el inmueble e inscribirlo directamente a nombre del comprador. Esto evita el doble gasto de inscripción y los tiempos de burocracia registral.',
  },
  {
    q: '¿Tengo que pagar honorarios al inicio de la sucesión?',
    a: 'Consultanos por nuestra modalidad de honorarios contra venta, que se cancelan recién al momento de vender un bien de la herencia. En caso de que no se quiera vender ningún bien, consultanos por un plan de pago en cuotas y con facilidades.',
  },
];

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left gap-4"
          >
            <span className="font-black italic uppercase text-sm text-slate-800 dark:text-slate-100 leading-tight">{item.q}</span>
            <span className="text-primary dark:text-accent shrink-0">
              {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SucesionesPage({ data }) {
  if (!data) return null;

  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">

        {/* HEADER */}
        <header className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em]">Estudio Jurídico</span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2">
            Tu Sucesión, resuelta para vender.
          </h1>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-8 max-w-3xl mx-auto font-medium italic leading-relaxed">
            En JOIN unificamos la gestión legal y la comercialización inmobiliaria, para que vender una propiedad heredada sea un proceso ágil, recuperes tu tranquilidad y el valor de tu patrimonio.
          </p>
        </header>

        {/* POR QUÉ ELEGIRNOS */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-4">¿Por qué elegirnos para tramitar la sucesión?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 font-medium italic">
            La mayoría de las personas se ven obligadas a coordinar con un abogado por un lado y una inmobiliaria por otro, lo que genera demoras y desinteligencias. En JOIN, somos un solo equipo con una visión dual.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POR_QUE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col gap-5">
                  <div className="p-4 rounded-xl w-fit">
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{item.titulo}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{item.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROCESO PASO A PASO */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Nuestro proceso paso a paso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESO_ITEMS.map((step, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative group hover:shadow-xl transition-all">
                <span className="absolute top-6 right-8 text-5xl font-black italic text-slate-100 dark:text-slate-800 group-hover:text-primary/10 dark:group-hover:text-accent/10 transition-colors select-none">
                  {step.num}
                </span>
                <h3 className="text-lg mb-3 pr-8">{step.titulo}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium italic leading-relaxed">{step.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTACIÓN */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-4">¿Qué documentación necesitás para comenzar?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12 font-medium italic">
            Para iniciar el análisis de forma inmediata, te solicitaremos:
          </p>
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DOC_ITEMS.map((doc, i) => {
                const Icon = doc.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="p-3 bg-primary dark:bg-accent rounded-xl text-white dark:text-slate-900 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-black italic uppercase text-xs text-slate-800 dark:text-slate-100 mb-1">{doc.titulo}</p>
                      <p className="text-xs text-slate-400 font-medium italic leading-relaxed">{doc.texto}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Preguntas frecuentes en sucesiones</h2>
          <Accordion items={FAQ_ITEMS} />
        </section>

        {/* CONTACTO */}
        <div id="contacto" className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl">No dejes que la burocracia detenga tus proyectos.</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium italic">Contactanos para analizar tu caso.</p>
          </div>
          <ContactoJoin brand={data.brand} defaultTema="Consultar por sucesión" />
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
    console.error('Error at sucesiones getServerSideProps:', e);
    return { props: { data: null } };
  }
}
