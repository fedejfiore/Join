import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { getIcon } from '../lib/icon-map';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SheetText from '../lib/sheet-text';

// ── Fallbacks (usados si la pestaña del sheet está vacía) ──────────────────
const DEFAULT_CFG = {
  titulo:               { valor: 'Tu Sucesión, resuelta para vender.' },
  subtitulo:            { valor: 'En JOIN unificamos la gestión legal y la comercialización inmobiliaria, para que vender una propiedad heredada sea un proceso ágil, recuperes tu tranquilidad y el valor de tu patrimonio.' },
  parallax_quote:       { valor: 'El tiempo importa. La burocracia no debería ser tu problema.' },
  parallax_sub:         { valor: 'Iniciamos los trámites sin honorarios previos. Los cobros se realizan al vender.' },
  section_porque_titulo:{ valor: '¿Por qué elegirnos para tramitar la sucesión?' },
  section_porque_sub:   { valor: 'La mayoría de las personas se ven obligadas a coordinar con un abogado por un lado y una inmobiliaria por otro, lo que genera demoras y desinteligencias. En JOIN, somos un solo equipo con una visión dual.' },
  section_proceso_titulo:{ valor: 'Nuestro proceso paso a paso' },
  section_docs_titulo:  { valor: '¿Qué documentación necesitás para comenzar?' },
  section_docs_sub:     { valor: 'Para iniciar el análisis de forma inmediata, te solicitaremos:' },
  section_faq_titulo:   { valor: 'Preguntas frecuentes en sucesiones' },
  contacto_titulo:      { valor: 'No dejes que la burocracia detenga tus proyectos.' },
  contacto_sub:         { valor: 'Contactanos para analizar tu caso.' },
};

const DEFAULT_PORQUE = [
  { Icono: 'Users',       Titulo: 'Interlocutor Único',      Texto: 'Un solo contacto para todo el proceso, desde el juzgado hasta la escritura. Se evitan los "teléfonos descompuestos" entre profesionales y se eliminan las demoras por falta de coordinación.' },
  { Icono: 'Zap',         Titulo: 'Aceleración de Plazos',   Texto: 'Utilizamos herramientas como el Tracto Abreviado para que la propiedad llegue al mercado en tiempo récord, sin necesidad de doble inscripción registral.' },
  { Icono: 'DollarSign',  Titulo: 'Honorarios contra Venta', Texto: 'Nuestro mayor compromiso es el resultado. Iniciamos los trámites sin desembolsos previos de honorarios profesionales; los mismos se cancelan al concretar la operación inmobiliaria.' },
];

const DEFAULT_PROCESO = [
  { Numero: '01', Titulo: 'Consulta Inicial y Diagnóstico', Texto: 'Agendamos una reunión (presencial o virtual) para conocer tu caso y establecer las bases de la solución.' },
  { Numero: '02', Titulo: 'Estrategia Legal y Auditoría',   Texto: 'Analizamos el contexto familiar y jurídico del inmueble para trazar una hoja de ruta que destrabe cualquier obstáculo.' },
  { Numero: '03', Titulo: 'Propuesta Integral',             Texto: 'Te presentamos un plan que incluye la gestión legal y comercial, bajo nuestro modelo de Honorarios contra la venta o plan de pago (si no necesitás vender).' },
  { Numero: '04', Titulo: 'Documentación e Inicio',         Texto: 'Con tu aprobación, recolectamos la documentación necesaria e iniciamos formalmente el expediente judicial y el plan de comercialización del inmueble.' },
];

const DEFAULT_DOCS = [
  { Icono: 'FileText', Titulo: 'Partida de Defunción (Original)', Texto: 'Del causante, obtenida en el Registro Civil.' },
  { Icono: 'Users',    Titulo: 'Partidas de vínculo',              Texto: 'Nacimiento, matrimonio o testamento para acreditar los lazos con el causante.' },
  { Icono: 'Home',     Titulo: 'Título de Propiedad',              Texto: 'Original o copia del bien inmueble a transmitir.' },
  { Icono: 'Receipt',  Titulo: 'Boleta de Impuesto Inmobiliario',  Texto: 'ABL / ARBA u organismo de recaudación correspondiente.' },
];

const DEFAULT_FAQ = [
  { Pregunta: '¿Cuánto tiempo tarda el trámite judicial de la sucesión?',         Respuesta: 'Tenemos casos en que la declaratoria de herederos se dictó en solo 2 meses desde el inicio del proceso. Pero no hay un tiempo estipulado: la relación entre los coherederos, el estado de la documentación y las diligencias del juzgado y registros son factores que pueden modificar sustancialmente los plazos.' },
  { Pregunta: '¿Todos los herederos tienen que hacer la sucesión con el mismo abogado?', Respuesta: 'No, no es obligatorio y cada uno puede presentarse con un abogado distinto. Hay situaciones que lo ameritan, pero encarecen y alargan el proceso. Si entre los herederos hay buena relación, presentarse con un mismo abogado suele ser menos costoso y más ágil.' },
  { Pregunta: '¿Puedo iniciar la sucesión si algún heredero se niega a iniciarla?', Respuesta: 'Sí y suele ser lo más recomendable para cuidar tus derechos. Quien inicia la sucesión debe denunciar la existencia de otros herederos, y se los notifica para que se presenten a hacer valer sus derechos.' },
  { Pregunta: '¿Puedo vender un inmueble si aún no se dictó la declaratoria de herederos?', Respuesta: 'Para vender un inmueble heredado es necesario contar previamente con la declaratoria de herederos (en sucesiones ab-intestato) o la declaración de validez formal del testamento. No obstante, en algunos casos se puede iniciar la propuesta de comercialización mientras el proceso judicial avanza, para ganar tiempo.' },
  { Pregunta: '¿Qué es el Tracto Abreviado?', Respuesta: 'Es una herramienta legal que permite vender el inmueble e inscribirlo directamente a nombre del comprador. Esto evita el doble gasto de inscripción y los tiempos de burocracia registral.' },
  { Pregunta: '¿Tengo que pagar honorarios al inicio de la sucesión?', Respuesta: 'Consultanos por nuestra modalidad de honorarios contra venta, que se cancelan recién al momento de vender un bien de la herencia. En caso de que no se quiera vender ningún bien, consultanos por un plan de pago en cuotas y con facilidades.' },
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
            <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.4, color: 'var(--text-strong)' }}>{item.Pregunta}</span>
            <span style={{ color: '#cc0044', flexShrink: 0 }}>
              {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {open === i && (
            <SheetText text={item.Respuesta} as="div" style={{ padding: '1rem 1.5rem 1.25rem', fontSize: '14px', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', borderTop: '1px solid var(--divider)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SucesionesPage({ data }) {
  if (!data) return null;

  const cfg     = Object.keys(data.sucesiones_cfg || {}).length ? data.sucesiones_cfg : DEFAULT_CFG;
  const porque  = data.sucesiones_porque?.length  ? data.sucesiones_porque  : DEFAULT_PORQUE;
  const proceso = data.sucesiones_proceso?.length  ? data.sucesiones_proceso : DEFAULT_PROCESO;
  const docs    = data.sucesiones_docs?.length     ? data.sucesiones_docs    : DEFAULT_DOCS;
  const faqs    = data.sucesiones_faq?.length      ? data.sucesiones_faq     : DEFAULT_FAQ;

  const v = (key) => cfg[key]?.valor || DEFAULT_CFG[key]?.valor || '';

  return (
    <Layout data={data}>
      <div className="min-h-screen pt-44 pb-24">

        {/* HEADER */}
        <header style={{ maxWidth: '1280px', margin: '0 auto 7rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--typo-h1-size)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1.05, letterSpacing: 'var(--typo-h1-tracking)', marginTop: '1rem' }}>
            {v('titulo')}
          </h1>
          <div style={{ width: '6rem', height: '5px', background: '#660033', margin: '2rem auto', borderRadius: '3px' }} />
          <p style={{ maxWidth: '720px', margin: '0 auto', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            <SheetText text={v('subtitulo')} />
          </p>
        </header>

        {/* POR QUÉ ELEGIRNOS */}
        <section className="scroll-reveal" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '1rem' }}>
            {v('section_porque_titulo')}
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <SheetText text={v('section_porque_sub')} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {porque.map((item, i) => {

              const Icon = getIcon(item.Icono);
              return (
                <div key={i} className="card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(102,0,51,0.15)', color: '#cc0044', padding: '1rem', borderRadius: '0.75rem', width: 'fit-content' }}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: '0.625rem' }}>{item.Titulo}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}><SheetText text={item.Texto} /></p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PARALLAX BANNER */}
        <div style={{ position: 'relative', height: '300px', margin: '0 0 6rem 0', overflow: 'hidden', background: 'linear-gradient(135deg, #1a0010 0%, #660033 50%, #330019 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,0,68,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(102,0,51,0.2) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>Nuestra propuesta</p>
            <p style={{ fontSize: 'clamp(1.375rem, 3.5vw, 2.25rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.25, maxWidth: '720px', letterSpacing: '-0.02em' }}>
              "<SheetText text={v('parallax_quote')} />"
            </p>
            <div style={{ width: '3.5rem', height: '3px', background: 'rgba(255,255,255,0.35)', margin: '1.5rem auto 0', borderRadius: '2px' }} />
            <SheetText as="p" text={v('parallax_sub')} style={{ marginTop: '1.25rem', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }} />
          </div>
        </div>

        {/* PROCESO PASO A PASO */}
        <section className="scroll-reveal" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '3rem' }}>
            {v('section_proceso_titulo')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proceso.map((step, i) => (
              <div key={i} className="card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '3.5rem', fontWeight: 900, color: 'rgba(102,0,51,0.18)', lineHeight: 1, userSelect: 'none' }}>
                  {step.Numero}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: '0.75rem', paddingRight: '3rem', lineHeight: 1.4 }}>{step.Titulo}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-muted)' }}><SheetText text={step.Texto} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTACIÓN */}
        <section className="scroll-reveal" style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '1rem' }}>
            {v('section_docs_titulo')}
          </h2>
          <SheetText as="p" text={v('section_docs_sub')} style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 2.5rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }} />
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2.25rem' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {docs.map((doc, i) => {
                const Icon = getIcon(doc.Icono);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', borderRadius: '1rem', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)' }}>
                    <div style={{ background: '#660033', color: '#fff', padding: '0.75rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px', color: 'var(--text-strong)' }}>{doc.Titulo}</p>
                      <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)' }}><SheetText text={doc.Texto} /></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="scroll-reveal" style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '3rem' }}>
            {v('section_faq_titulo')}
          </h2>
          <Accordion items={faqs} />
        </section>

        {/* PARALLAX CONTACTO */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a0010 0%, #660033 50%, #330019 100%)', padding: '5rem 1.5rem', marginBottom: '0' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,0,68,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(102,0,51,0.25) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {v('contacto_titulo')}
            </h2>
            {v('contacto_sub') && (
              <SheetText as="p" text={v('contacto_sub')} style={{ marginTop: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }} />
            )}
          </div>
        </div>
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
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
