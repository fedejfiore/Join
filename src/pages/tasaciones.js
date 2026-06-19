import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { getIcon } from '../lib/icon-map';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SheetText from '../lib/sheet-text';
import ParallaxSection from '../components/ui/ParallaxSection';

// ── Fallbacks ──────────────────────────────────────────────────────────────
const DEFAULT_CFG = {
  titulo:                { valor: '¿Querés vender o alquilar tu propiedad?' },
  subtitulo_1:           { valor: 'Todos prometen lo mismo: "vendemos rápido", "trato personalizado", pero tu propiedad no se vende con frases hechas. Para vender es necesario contar con una tasación correcta, una clara estrategia de comercialización y conocimientos legales para redactar acuerdos.' },
  subtitulo_2:           { valor: 'En JOIN analizamos propiedades comparables y su tiempo en el mercado, revisamos métricas de visitas, efectuamos un seguimiento semanal y ejecutamos correcciones para lograr resultados concretos. No es magia. Es experiencia, análisis y trabajo.' },
  cta_label:             { valor: 'Conocé el valor de tu propiedad →' },
  section_docs_titulo:   { valor: 'Documentación y gestiones para vender' },
  section_docs_sub:      { valor: 'Desde el inicio elaboramos una carpeta con la documentación necesaria para que no haya sorpresas al momento de la venta.' },
  section_propuesta_titulo:{ valor: '¿Qué incluye nuestra propuesta de valor?' },
  section_propuesta_sub: { valor: 'En el mercado actual es imprescindible contar con una clara propuesta de comercialización y producción multimedia que destaque el potencial de tu propiedad.' },
  section_faq_titulo:    { valor: 'Preguntas frecuentes sobre el proceso de venta' },
  section_faq_sub:       { valor: 'Sabemos que vender una propiedad es una de las decisiones financieras más importantes. Aquí respondemos las dudas más comunes.' },
  contacto_titulo:       { valor: 'Pedí tu tasación y conocé el valor de tu propiedad' },
};

const DEFAULT_DOCS = [
  { Icono: 'FileText',  Titulo: 'Título de la propiedad',           Texto: 'Documentación que acredita la titularidad del inmueble.' },
  { Icono: 'User',      Titulo: 'DNI de los titulares',             Texto: 'Identificación de todos los propietarios registrales.' },
  { Icono: 'Search',    Titulo: 'Informes de dominio e inhibición', Texto: 'Verificación de cargas, gravámenes y deudas sobre el inmueble.' },
  { Icono: 'FileCheck', Titulo: 'Autorización de venta',            Texto: 'Contrato de corretaje que nos habilita a comercializar la propiedad.' },
  { Icono: 'BarChart2', Titulo: 'Propuesta de comercialización',    Texto: 'Estrategia de precios y canales basada en comparables reales del mercado.' },
  { Icono: 'Camera',    Titulo: 'Producción multimedia',            Texto: 'Fotografía profesional, video recorrido, tour 360° y plano ilustrativo.' },
];

const DEFAULT_PROPUESTA = [
  { Icono: 'Camera', Titulo: 'Fotografías profesionales',     Texto: 'No sacamos fotos "rápidas". Preparamos la propiedad, cuidamos los detalles y capturamos la mejor luz, ángulos y encuadres para mostrar todo su potencial. Las fotos de calidad generan más clicks, más consultas y más visitas.' },
  { Icono: 'Film',   Titulo: 'Video recorrido',               Texto: 'Generamos videos que muestran la propiedad de forma clara, dinámica y atractiva. Permite que los compradores se imaginen viviendo allí antes de visitarla. Pensamos el recorrido, los planos y el ritmo para que sea interesante.' },
  { Icono: 'Globe',  Titulo: 'Tour virtual interactivo 360°', Texto: 'Creamos recorridos interactivos donde los compradores pueden recorrer la propiedad desde su casa. Es fundamental para filtrar curiosos y atraer a los interesados reales, ahorrando tiempo al propietario.' },
  { Icono: 'MapPin', Titulo: 'Plano ilustrativo',             Texto: 'Mostramos la distribución de la propiedad de forma clara con planos legibles que ayudan a entender la comunicación entre los espacios antes de visitarla y reducir dudas.' },
  { Icono: 'Layers', Titulo: 'Virtual Staging',               Texto: 'Realizamos un amoblamiento virtual de espacios vacíos, que ayuda a los compradores a visualizar el potencial del diseño interior y la decoración del inmueble.' },
];

const DEFAULT_FAQ = [
  { Pregunta: '¿Qué es la tasación y por qué es tan importante?',          Respuesta: 'Una tasación es un proceso técnico a cargo de un profesional idóneo para estimar el valor de un bien en el mercado. El método más utilizado en el mercado inmobiliario es el de comparables, que requiere un análisis exhaustivo del mercado y de la situación jurídica de la propiedad. La tasación es el primer paso indispensable para una operación exitosa porque da una aproximación del valor objetivo, real y realizable.' },
  { Pregunta: '¿Qué es la autorización de venta y por cuánto tiempo se otorga?', Respuesta: 'La autorización de venta es un contrato de corretaje entre los propietarios y la inmobiliaria para que ésta pueda comercializar la propiedad en las condiciones pactadas. Trabajamos con un plazo estándar de 120 días que nos permite ejecutar toda la producción de la comercialización. Efectuamos un seguimiento semanal: si la propiedad no recibe consultas, analizamos las métricas y corregimos la estrategia de inmediato.' },
  { Pregunta: '¿Es recomendable firmar una autorización en exclusiva?',     Respuesta: 'Sí, y lo es en beneficio de tu propiedad. Cuando muchas agencias publican lo mismo, el mensaje se debilita y el valor percibido por los compradores se deprecia. La exclusividad nos permite invertir en producción multimedia de alto nivel y garantiza que seamos los únicos responsables de defender el precio de tu patrimonio ante cada oferta.' },
  { Pregunta: '¿Cómo coordinan las visitas para no afectar mi rutina?',    Respuesta: 'Filtramos a los interesados. Gracias al Tour Virtual 360° y al Video Recorrido, quienes solicitan una visita presencial ya conocen la distribución y el estado real de la propiedad. Esto reduce las visitas de "curiosos" y asegura que solo abras tu puerta a compradores con intención real de cierre.' },
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

export default function TasacionesPage({ data }) {
  if (!data) return null;

  const cfg      = Object.keys(data.tasaciones_cfg || {}).length ? data.tasaciones_cfg : DEFAULT_CFG;
  const docs     = data.tasaciones_docs?.length     ? data.tasaciones_docs     : DEFAULT_DOCS;
  const propuesta= data.tasaciones_propuesta?.length ? data.tasaciones_propuesta : DEFAULT_PROPUESTA;
  const faqs     = data.tasaciones_faq?.length      ? data.tasaciones_faq      : DEFAULT_FAQ;

  const v = (key) => cfg[key]?.valor || DEFAULT_CFG[key]?.valor || '';

  return (
    <Layout data={data}>
      <div className="min-h-screen" style={{ paddingTop: "9rem", paddingBottom: "6rem" }}>

        {/* HEADER */}
        <header style={{ maxWidth: '1280px', margin: '0 auto 7rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--typo-h1-size)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1.05, letterSpacing: 'var(--typo-h1-tracking)' }}>
            {v('titulo')}
          </h1>
          <div style={{ width: '6rem', height: '5px', background: '#660033', margin: '2rem auto', borderRadius: '3px' }} />
          <p style={{ maxWidth: '720px', margin: '0 auto 1rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            <SheetText text={v('subtitulo_1')} />
          </p>
          <p style={{ maxWidth: '720px', margin: '0 auto 2.5rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            <SheetText text={v('subtitulo_2')} />
          </p>
          <a href="#contacto"
            style={{ display: 'inline-block', background: '#660033', color: '#fff', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px', textDecoration: 'none', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {v('cta_label')}
          </a>
        </header>

        {/* DOCUMENTACIÓN NECESARIA */}
        <section className="scroll-reveal" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '1rem' }}>
            {v('section_docs_titulo')}
          </h2>
          <SheetText as="p" text={v('section_docs_sub')} style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((item, i) => {
              const Icon = getIcon(item.Icono);
              return (
                <div key={i} className="card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ background: '#660033', color: '#fff', padding: '0.75rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text-strong)' }}>{item.Titulo}</p>
                    <p style={{ fontSize: '12px', lineHeight: 1.65, color: 'var(--text-muted)' }}><SheetText text={item.Texto} /></p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="scroll-reveal" style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '1rem' }}>
            {v('section_propuesta_titulo')}
          </h2>
          <SheetText as="p" text={v('section_propuesta_sub')} style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {propuesta.map((item, i) => {
              const Icon = getIcon(item.Icono);
              return (
                <div key={i} className="card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem 2.25rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(102,0,51,0.12)', color: '#cc0044', padding: '1rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                    <Icon size={26} />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: '0.5rem' }}>{item.Titulo}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}><SheetText text={item.Texto} /></p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="scroll-reveal" style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'var(--typo-h2-size)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: 'var(--typo-h2-tracking)', textAlign: 'center', marginBottom: '1rem' }}>
            {v('section_faq_titulo')}
          </h2>
          <SheetText as="p" text={v('section_faq_sub')} style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }} />
          <Accordion items={faqs} />
        </section>

        {/* PARALLAX CONTACTO */}
        <ParallaxSection style={{ padding: '5rem 1.5rem' }}>
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {v('contacto_titulo')}
            </h2>
          </div>
        </ParallaxSection>
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
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
