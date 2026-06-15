import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { FileText, User, Search, FileCheck, BarChart2, Camera, Film, Globe, MapPin, Layers, ChevronDown, ChevronUp } from 'lucide-react';

const DOC_ITEMS = [
  { icon: FileText,  titulo: 'Título de la propiedad',    texto: 'Documentación que acredita la titularidad del inmueble.' },
  { icon: User,      titulo: 'DNI de los titulares',       texto: 'Identificación de todos los propietarios registrales.' },
  { icon: Search,    titulo: 'Informes de dominio e inhibición', texto: 'Verificación de cargas, gravámenes y deudas sobre el inmueble.' },
  { icon: FileCheck, titulo: 'Autorización de venta',      texto: 'Contrato de corretaje que nos habilita a comercializar la propiedad.' },
  { icon: BarChart2, titulo: 'Propuesta de comercialización', texto: 'Estrategia de precios y canales basada en comparables reales del mercado.' },
  { icon: Camera,    titulo: 'Producción multimedia',      texto: 'Fotografía profesional, video recorrido, tour 360° y plano ilustrativo.' },
];

const PROPUESTA_ITEMS = [
  {
    icon: Camera,
    titulo: 'Fotografías profesionales',
    texto: 'No sacamos fotos "rápidas". Preparamos la propiedad, cuidamos los detalles y capturamos la mejor luz, ángulos y encuadres para mostrar todo su potencial. Las fotos de calidad generan más clicks, más consultas y más visitas.',
  },
  {
    icon: Film,
    titulo: 'Video recorrido',
    texto: 'Generamos videos que muestran la propiedad de forma clara, dinámica y atractiva. Permite que los compradores se imaginen viviendo allí antes de visitarla. Pensamos el recorrido, los planos y el ritmo para que sea interesante.',
  },
  {
    icon: Globe,
    titulo: 'Tour virtual interactivo 360°',
    texto: 'Creamos recorridos interactivos donde los compradores pueden recorrer la propiedad desde su casa. Es fundamental para filtrar curiosos y atraer a los interesados reales, ahorrando tiempo al propietario.',
  },
  {
    icon: MapPin,
    titulo: 'Plano ilustrativo',
    texto: 'Mostramos la distribución de la propiedad de forma clara con planos legibles que ayudan a entender la comunicación entre los espacios antes de visitarla y reducir dudas.',
  },
  {
    icon: Layers,
    titulo: 'Virtual Staging',
    texto: 'Realizamos un amoblamiento virtual de espacios vacíos, que ayuda a los compradores a visualizar el potencial del diseño interior y la decoración del inmueble.',
  },
];

const FAQ_ITEMS = [
  {
    q: '¿Qué es la tasación y por qué es tan importante?',
    a: 'Una tasación es un proceso técnico a cargo de un profesional idóneo para estimar el valor de un bien en el mercado. El método más utilizado en el mercado inmobiliario es el de comparables, que requiere un análisis exhaustivo del mercado y de la situación jurídica de la propiedad. La tasación es el primer paso indispensable para una operación exitosa porque da una aproximación del valor objetivo, real y realizable.',
  },
  {
    q: '¿Qué es la autorización de venta y por cuánto tiempo se otorga?',
    a: 'La autorización de venta es un contrato de corretaje entre los propietarios y la inmobiliaria para que ésta pueda comercializar la propiedad en las condiciones pactadas. Trabajamos con un plazo estándar de 120 días que nos permite ejecutar toda la producción de la comercialización. Efectuamos un seguimiento semanal: si la propiedad no recibe consultas, analizamos las métricas y corregimos la estrategia de inmediato.',
  },
  {
    q: '¿Es recomendable firmar una autorización en exclusiva?',
    a: 'Sí, y lo es en beneficio de tu propiedad. Cuando muchas agencias publican lo mismo, el mensaje se debilita y el valor percibido por los compradores se deprecia. La exclusividad nos permite invertir en producción multimedia de alto nivel y garantiza que seamos los únicos responsables de defender el precio de tu patrimonio ante cada oferta.',
  },
  {
    q: '¿Cómo coordinan las visitas para no afectar mi rutina?',
    a: 'Filtramos a los interesados. Gracias al Tour Virtual 360° y al Video Recorrido, quienes solicitan una visita presencial ya conocen la distribución y el estado real de la propiedad. Esto reduce las visitas de "curiosos" y asegura que solo abras tu puerta a compradores con intención real de cierre.',
  },
];

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left gap-4"
          >
            <span className="font-black italic uppercase text-sm text-slate-800 dark:text-slate-100 leading-tight">
              {item.q}
            </span>
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

export default function TasacionesPage({ data }) {
  if (!data) return null;

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">

        {/* HEADER */}
        <header className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <span className="text-primary dark:text-accent font-black text-[10px] uppercase tracking-[0.3em]">Servicios</span>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary dark:text-accent uppercase leading-none tracking-tighter mt-2">
            ¿Querés vender o alquilar tu propiedad?
          </h1>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-8 max-w-3xl mx-auto font-medium italic leading-relaxed">
            Todos prometen lo mismo: "vendemos rápido", "trato personalizado", pero tu propiedad no se vende con frases hechas. Para vender es necesario contar con una tasación correcta, una clara estrategia de comercialización y conocimientos legales para redactar acuerdos.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-3xl mx-auto font-medium italic leading-relaxed">
            En JOIN analizamos propiedades comparables y su tiempo en el mercado, revisamos métricas de visitas, efectuamos un seguimiento semanal y ejecutamos correcciones para lograr resultados concretos. No es magia. Es experiencia, análisis y trabajo.
          </p>
          <a href="#contacto"
            className="inline-block mt-8 bg-primary dark:bg-accent text-white dark:text-slate-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-xs">
            Conocé el valor de tu propiedad →
          </a>
        </header>

        {/* DOCUMENTACIÓN NECESARIA */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-4">Documentación y gestiones para vender</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 font-medium italic">
            Desde el inicio elaboramos una carpeta con la documentación necesaria para que no haya sorpresas al momento de la venta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOC_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] p-7 border border-slate-100 dark:border-slate-800 shadow-sm flex gap-5 items-start hover:shadow-lg transition-all">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-primary dark:text-accent shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-black italic uppercase text-sm text-slate-800 dark:text-slate-100 mb-1">{item.titulo}</p>
                    <p className="text-xs text-slate-400 font-medium italic leading-relaxed">{item.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-4">¿Qué incluye nuestra propuesta de valor?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 font-medium italic">
            En el mercado actual es imprescindible contar con una clara propuesta de comercialización y producción multimedia que destaque el potencial de tu propiedad.
          </p>
          <div className="space-y-6">
            {PROPUESTA_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-all">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-primary dark:text-accent shrink-0">
                    <Icon size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">{item.titulo}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{item.texto}</p>
                  </div>
                  {/* Placeholder para frame de muestra */}
                  <div className="w-full md:w-48 h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600">Muestra</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl text-center mb-4">Preguntas frecuentes sobre el proceso de venta</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12 font-medium italic">
            Sabemos que vender una propiedad es una de las decisiones financieras más importantes. Aquí respondemos las dudas más comunes.
          </p>
          <Accordion items={FAQ_ITEMS} />
        </section>

        {/* CONTACTO */}
        <div id="contacto" className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl">Pedí tu tasación y conocé el valor de tu propiedad</h2>
          </div>
          <ContactoJoin brand={data.brand} defaultTema="Pedir una tasación" />
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
    console.error('Error at tasaciones getServerSideProps:', e);
    return { props: { data: null } };
  }
}
