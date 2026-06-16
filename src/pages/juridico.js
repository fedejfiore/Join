import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { getIcon } from '../lib/icon-map';
import SheetText from '../lib/sheet-text';

// ── Fallbacks ──────────────────────────────────────────────────────────────
const DEFAULT_CFG = {
  titulo:        { valor: 'Áreas de Práctica Legal' },
  subtitulo:     { valor: 'Asesoramiento legal integral con un enfoque preventivo y soluciones estratégicas para particulares, inversores y empresas. Hacé click en cada área para conocer más.' },
  contacto_titulo:{ valor: '¿Tenés una consulta legal?' },
  contacto_sub:  { valor: 'Contanos tu caso y te orientamos sin compromiso.' },
};

const DEFAULT_AREAS = [
  { Icono: 'SplitSquareVertical', Titulo: 'División de Condominio',  Descripcion: 'Cuando los condóminos no pueden ponerse de acuerdo, iniciamos la acción judicial para dividir el bien en especie o venderlo y liquidar el producido en proporción a las alícuotas.' },
  { Icono: 'Gavel',               Titulo: 'Desalojos',               Descripcion: 'Acciones ágiles frente a la falta de pago, vencimiento de contrato o intrusiones. Representamos al propietario en mediaciones y en todas las etapas judiciales para recuperar la tenencia del inmueble.' },
  { Icono: 'Landmark',            Titulo: 'Usucapión',               Descripcion: 'Regularización dominial de inmuebles poseídos de forma pública, pacífica y continua por el plazo que fija la ley. Tramitamos la obtención judicial del título de propiedad definitivo.' },
  { Icono: 'FileText',            Titulo: 'Contratos a Medida',      Descripcion: 'Redacción y revisión minuciosa de contratos de locación, boletos de compraventa, reservas, cesiones de derechos y todo tipo de acuerdo vinculado a operaciones inmobiliarias.' },
  { Icono: 'DollarSign',          Titulo: 'Cobro de Alquileres',     Descripcion: 'Gestión extrajudicial y judicial del cobro de alquileres impagos. Iniciamos el proceso de desalojo y de cobro en forma simultánea para recuperar lo adeudado en el menor tiempo posible.' },
  { Icono: 'Receipt',             Titulo: 'Ejecución de Expensas',   Descripcion: 'Representamos a administraciones y consorcios en el cobro de expensas ordinarias y extraordinarias mediante el proceso ejecutivo, la más rápida vía judicial disponible.' },
  { Icono: 'Heart',               Titulo: 'Divorcios',               Descripcion: 'Tramitamos divorcios express unilaterales o de mutuo acuerdo, convenios reguladores de bienes, régimen de comunicación parental, alimentos y liquidación de sociedad conyugal.' },
  { Icono: 'ShieldCheck',         Titulo: 'Derecho del Consumidor',  Descripcion: 'Reclamos ante la Defensa del Consumidor, acciones judiciales por daños y perjuicios vinculados a relaciones de consumo, productos defectuosos y prácticas abusivas de empresas.' },
  { Icono: 'Car',                 Titulo: 'Accidentes de Tránsito',  Descripcion: 'Representación de víctimas de accidentes viales para reclamar daños físicos, psicológicos y materiales ante las aseguradoras y los responsables, en sede civil o penal.' },
];

function FlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = getIcon(item.Icono);

  return (
    <div style={{ height: '380px', width: '100%', perspective: '1000px' }}>
      <div style={{
        position: 'relative', height: '100%', width: '100%',
        transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONTAL */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.25rem', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '2.25rem', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: 'var(--card-bg)', border: '1px solid var(--card-border)',
        }}>
          <div style={{ background: 'rgba(102,0,51,0.12)', color: '#cc0044', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
            <Icon size={32} />
          </div>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.35, marginBottom: '1.5rem', textAlign: 'center' }}>
            {item.Titulo}
          </h3>
          <button
            onClick={() => setIsFlipped(true)}
            style={{ background: '#660033', color: '#fff', padding: '0.625rem 1.75rem', borderRadius: '9999px', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.18em', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Saber Más
          </button>
        </div>

        {/* TRASERO */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.25rem', padding: '2.25rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', zIndex: 20, background: '#660033',
          transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        }}>
          <p style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '14px', textAlign: 'center', lineHeight: 1.3, color: '#fff' }}>
            {item.Titulo}
          </p>
          <div style={{ width: '40px', height: '2px', borderRadius: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <p style={{ fontSize: '14px', lineHeight: 1.75, textAlign: 'center', fontWeight: 500, color: 'rgba(255,255,255,0.88)', flex: 1, display: 'flex', alignItems: 'center' }}>
            <SheetText text={item.Descripcion} />
          </p>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFlipped(false); }}
            style={{ border: '2px solid rgba(255,255,255,0.4)', color: '#fff', background: 'transparent', padding: '0.5rem 1.5rem', borderRadius: '9999px', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#660033'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JuridicoPage({ data }) {
  if (!data) return null;

  const cfg   = Object.keys(data.juridico_cfg || {}).length ? data.juridico_cfg : DEFAULT_CFG;
  const areas = data.juridico_areas?.length ? data.juridico_areas : DEFAULT_AREAS;

  const v = (key) => cfg[key]?.valor || DEFAULT_CFG[key]?.valor || '';

  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">

        {/* HEADER */}
        <header style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 4.25rem)', fontWeight: 900, color: 'var(--text-strong)', lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: '1rem' }}>
            {v('titulo')}
          </h1>
          <div style={{ width: '6rem', height: '5px', background: '#660033', margin: '2rem auto', borderRadius: '3px' }} />
          <p style={{ maxWidth: '640px', margin: '0 auto', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
            {v('subtitulo')}
          </p>
        </header>

        {/* GRILLA FLIP CARDS */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, i) => (
              <FlipCard key={i} item={area} />
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-strong)' }}>
              {v('contacto_titulo')}
            </h2>
            {v('contacto_sub') && (
              <p style={{ marginTop: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}><SheetText text={v('contacto_sub')} /></p>
            )}
          </div>
          <ContactoJoin brand={data.brand} defaultTema="Otra consulta legal" />
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
    console.error('Error at juridico getServerSideProps:', e);
    return { props: { data: null } };
  }
}
