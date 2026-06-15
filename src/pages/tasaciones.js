import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { FileText, User, Search, FileCheck, BarChart2, Camera, Film, Globe, MapPin, Layers, ChevronDown, ChevronUp } from 'lucide-react';

const DOC_ITEMS = [
  { icon: FileText,  titulo: 'Título de la propiedad',              texto: 'Documentación que acredita la titularidad del inmueble.' },
  { icon: User,      titulo: 'DNI de los titulares',                texto: 'Identificación de todos los propietarios registrales.' },
  { icon: Search,    titulo: 'Informes de dominio e inhibición',    texto: 'Verificación de cargas, gravámenes y deudas sobre el inmueble.' },
  { icon: FileCheck, titulo: 'Autorización de venta',               texto: 'Contrato de corretaje que nos habilita a comercializar la propiedad.' },
  { icon: BarChart2, titulo: 'Propuesta de comercialización',       texto: 'Estrategia de precios y canales basada en comparables reales del mercado.' },
  { icon: Camera,    titulo: 'Producción multimedia',               texto: 'Fotografía profesional, video recorrido, tour 360° y plano ilustrativo.' },
];

const PROPUESTA_ITEMS = [
  { icon: Camera,  titulo: 'Fotografías profesionales', texto: 'No sacamos fotos "rápidas". Preparamos la propiedad, cuidamos los detalles y capturamos la mejor luz, ángulos y encuadres para mostrar todo su potencial. Las fotos de calidad generan más clicks, más consultas y más visitas.' },
  { icon: Film,    titulo: 'Video recorrido',            texto: 'Generamos videos que muestran la propiedad de forma clara, dinámica y atractiva. Permite que los compradores se imaginen viviendo allí antes de visitarla. Pensamos el recorrido, los planos y el ritmo para que sea interesante.' },
  { icon: Globe,   titulo: 'Tour virtual interactivo 360°', texto: 'Creamos recorridos interactivos donde los compradores pueden recorrer la propiedad desde su casa. Es fundamental para filtrar curiosos y atraer a los interesados reales, ahorrando tiempo al propietario.' },
  { icon: MapPin,  titulo: 'Plano ilustrativo',          texto: 'Mostramos la distribución de la propiedad de forma clara con planos legibles que ayudan a entender la comunicación entre los espacios antes de visitarla y reducir dudas.' },
  { icon: Layers,  titulo: 'Virtual Staging',            texto: 'Realizamos un amoblamiento virtual de espacios vacíos, que ayuda a los compradores a visualizar el potencial del diseño interior y la decoración del inmueble.' },
];

const FAQ_ITEMS = [
  { q: '¿Qué es la tasación y por qué es tan importante?', a: 'Una tasación es un proceso técnico a cargo de un profesional idóneo para estimar el valor de un bien en el mercado. El método más utilizado en el mercado inmobiliario es el de comparables, que requiere un análisis exhaustivo del mercado y de la situación jurídica de la propiedad. La tasación es el primer paso indispensable para una operación exitosa porque da una aproximación del valor objetivo, real y realizable.' },
  { q: '¿Qué es la autorización de venta y por cuánto tiempo se otorga?', a: 'La autorización de venta es un contrato de corretaje entre los propietarios y la inmobiliaria para que ésta pueda comercializar la propiedad en las condiciones pactadas. Trabajamos con un plazo estándar de 120 días que nos permite ejecutar toda la producción de la comercialización. Efectuamos un seguimiento semanal: si la propiedad no recibe consultas, analizamos las métricas y corregimos la estrategia de inmediato.' },
  { q: '¿Es recomendable firmar una autorización en exclusiva?', a: 'Sí, y lo es en beneficio de tu propiedad. Cuando muchas agencias publican lo mismo, el mensaje se debilita y el valor percibido por los compradores se deprecia. La exclusividad nos permite invertir en producción multimedia de alto nivel y garantiza que seamos los únicos responsables de defender el precio de tu patrimonio ante cada oferta.' },
  { q: '¿Cómo coordinan las visitas para no afectar mi rutina?', a: 'Filtramos a los interesados. Gracias al Tour Virtual 360° y al Video Recorrido, quienes solicitan una visita presencial ya conocen la distribución y el estado real de la propiedad. Esto reduce las visitas de "curiosos" y asegura que solo abras tu puerta a compradores con intención real de cierre.' },
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
            <div style={{ padding: '1rem 1.5rem 1.25rem', fontSize: '14px', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', borderTop: '1px solid var(--divider)' }}>
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
      <div className="min-h-screen pt-32 pb-24">

        {/* HEADER */}
        <header style={{ maxWidth: '1280px', margin: '0 auto 7rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#cc0044' }}>
            Servicios
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 4.25rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: '1rem' }}>
            ¿Querés vender o alquilar tu propiedad?
          </h1>
          <div style={{ width: '6rem', height: '5px', background: '#660033', margin: '2rem auto', borderRadius: '3px' }} />
          <p style={{ maxWidth: '720px', margin: '0 auto 1rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Todos prometen lo mismo: "vendemos rápido", "trato personalizado", pero tu propiedad no se vende con frases hechas. Para vender es necesario contar con una tasación correcta, una clara estrategia de comercialización y conocimientos legales para redactar acuerdos.
          </p>
          <p style={{ maxWidth: '720px', margin: '0 auto 2.5rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            En JOIN analizamos propiedades comparables y su tiempo en el mercado, revisamos métricas de visitas, efectuamos un seguimiento semanal y ejecutamos correcciones para lograr resultados concretos. No es magia. Es experiencia, análisis y trabajo.
          </p>
          <a href="#contacto"
            style={{ display: 'inline-block', background: '#660033', color: '#fff', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px', textDecoration: 'none', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Conocé el valor de tu propiedad →
          </a>
        </header>

        {/* DOCUMENTACIÓN NECESARIA */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)', fontWeight: 800, color: 'var(--text-strong)', textAlign: 'center', marginBottom: '1rem' }}>
            Documentación y gestiones para vender
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Desde el inicio elaboramos una carpeta con la documentación necesaria para que no haya sorpresas al momento de la venta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOC_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', transition: 'box-shadow 0.3s' }}>
                  <div style={{ background: '#660033', color: '#fff', padding: '0.75rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text-strong)' }}>{item.titulo}</p>
                    <p style={{ fontSize: '12px', lineHeight: 1.65, color: 'var(--text-muted)' }}>{item.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)', fontWeight: 800, color: 'var(--text-strong)', textAlign: 'center', marginBottom: '1rem' }}>
            ¿Qué incluye nuestra propuesta de valor?
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            En el mercado actual es imprescindible contar con una clara propuesta de comercialización y producción multimedia que destaque el potencial de tu propiedad.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PROPUESTA_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem 2.25rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap', transition: 'box-shadow 0.3s' }}>
                  <div style={{ background: 'rgba(102,0,51,0.12)', color: '#cc0044', padding: '1rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                    <Icon size={26} />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: '0.5rem' }}>{item.titulo}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{item.texto}</p>
                  </div>
                  <div style={{ width: '160px', height: '88px', borderRadius: '0.75rem', background: 'var(--card-inner-bg)', border: '1px dashed var(--card-inner-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-faint)' }}>Muestra</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)', fontWeight: 800, color: 'var(--text-strong)', textAlign: 'center', marginBottom: '1rem' }}>
            Preguntas frecuentes sobre el proceso de venta
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 3rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Sabemos que vender una propiedad es una de las decisiones financieras más importantes. Aquí respondemos las dudas más comunes.
          </p>
          <Accordion items={FAQ_ITEMS} />
        </section>

        {/* CONTACTO */}
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-strong)' }}>
              Pedí tu tasación y conocé el valor de tu propiedad
            </h2>
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
