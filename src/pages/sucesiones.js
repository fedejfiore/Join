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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1rem', overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', textAlign: 'left', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.4, color: 'var(--text-strong)' }}>{item.q}</span>
            <span style={{ color: '#cc0044', flexShrink: 0 }}>
              {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {open === i && (
            <div style={{ padding: '0 1.5rem 1.25rem', paddingTop: '1rem', fontSize: '14px', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', borderTop: '1px solid var(--divider)' }}>
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
        <header className="text-center mb-28" style={{ maxWidth: '1280px', margin: '0 auto 7rem', padding: '0 1.5rem' }}>
          <span className="font-black text-[10px] uppercase tracking-[0.3em]" style={{ color: '#cc0044' }}>Estudio Jurídico</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mt-4">
            Tu Sucesión, resuelta para vender.
          </h1>
          <div className="w-24 h-1.5 mx-auto mt-8 rounded-full" style={{ background: '#660033' }} />
          <p className="mt-8 max-w-3xl mx-auto font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            En JOIN unificamos la gestión legal y la comercialización inmobiliaria, para que vender una propiedad heredada sea un proceso ágil, recuperes tu tranquilidad y el valor de tu patrimonio.
          </p>
        </header>

        {/* POR QUÉ ELEGIRNOS */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">¿Por qué elegirnos para tramitar la sucesión?</h2>
          <p className="text-center max-w-2xl mx-auto mb-12 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
            La mayoría de las personas se ven obligadas a coordinar con un abogado por un lado y una inmobiliaria por otro, lo que genera demoras y desinteligencias. En JOIN, somos un solo equipo con una visión dual.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POR_QUE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col gap-6"
                  style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="p-4 rounded-xl w-fit" style={{ background: 'rgba(102,0,51,0.15)', color: '#cc0044' }}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.titulo}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROCESO PASO A PASO */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Nuestro proceso paso a paso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESO_ITEMS.map((step, i) => (
              <div key={i} className="rounded-2xl p-8 relative group hover:shadow-xl transition-all"
                style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="absolute top-6 right-8 text-5xl font-black select-none" style={{ color: 'rgba(102,0,51,0.25)' }}>
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 pr-8">{step.titulo}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{step.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTACIÓN */}
        <section style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">¿Qué documentación necesitás para comenzar?</h2>
          <p className="text-center max-w-xl mx-auto mb-12 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Para iniciar el análisis de forma inmediata, te solicitaremos:
          </p>
          <div className="rounded-2xl p-8 md:p-10" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DOC_ITEMS.map((doc, i) => {
                const Icon = doc.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="p-3 rounded-xl shrink-0" style={{ background: '#660033', color: '#fff' }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-xs mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{doc.titulo}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{doc.texto}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Preguntas frecuentes en sucesiones</h2>
          <Accordion items={FAQ_ITEMS} />
        </section>

        {/* CONTACTO */}
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">No dejes que la burocracia detenga tus proyectos.</h2>
            <p className="mt-4 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>Contactanos para analizar tu caso.</p>
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
