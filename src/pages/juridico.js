import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { SplitSquareVertical, Gavel, Landmark, FileText, DollarSign, Receipt, Heart, ShieldCheck, Car } from 'lucide-react';

const AREAS = [
  {
    title: 'División de Condominio',
    description: 'Cuando los condóminos no pueden ponerse de acuerdo, iniciamos la acción judicial para dividir el bien en especie o venderlo y liquidar el producido en proporción a las alícuotas.',
    icon: SplitSquareVertical,
  },
  {
    title: 'Desalojos',
    description: 'Acciones ágiles frente a la falta de pago, vencimiento de contrato o intrusiones. Representamos al propietario en mediaciones y en todas las etapas judiciales para recuperar la tenencia del inmueble.',
    icon: Gavel,
  },
  {
    title: 'Usucapión',
    description: 'Regularización dominial de inmuebles poseídos de forma pública, pacífica y continua por el plazo que fija la ley. Tramitamos la obtención judicial del título de propiedad definitivo.',
    icon: Landmark,
  },
  {
    title: 'Contratos a Medida',
    description: 'Redacción y revisión minuciosa de contratos de locación, boletos de compraventa, reservas, cesiones de derechos y todo tipo de acuerdo vinculado a operaciones inmobiliarias.',
    icon: FileText,
  },
  {
    title: 'Cobro de Alquileres',
    description: 'Gestión extrajudicial y judicial del cobro de alquileres impagos. Iniciamos el proceso de desalojo y de cobro en forma simultánea para recuperar lo adeudado en el menor tiempo posible.',
    icon: DollarSign,
  },
  {
    title: 'Ejecución de Expensas',
    description: 'Representamos a administraciones y consorcios en el cobro de expensas ordinarias y extraordinarias mediante el proceso ejecutivo, la más rápida vía judicial disponible.',
    icon: Receipt,
  },
  {
    title: 'Divorcios',
    description: 'Tramitamos divorcios express unilaterales o de mutuo acuerdo, convenios reguladores de bienes, régimen de comunicación parental, alimentos y liquidación de sociedad conyugal.',
    icon: Heart,
  },
  {
    title: 'Derecho del Consumidor',
    description: 'Reclamos ante la Defensa del Consumidor, acciones judiciales por daños y perjuicios vinculados a relaciones de consumo, productos defectuosos y prácticas abusivas de empresas.',
    icon: ShieldCheck,
  },
  {
    title: 'Accidentes de Tránsito',
    description: 'Representación de víctimas de accidentes viales para reclamar daños físicos, psicológicos y materiales ante las aseguradoras y los responsables, en sede civil o penal.',
    icon: Car,
  },
];

function FlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = item.icon;

  return (
    <div className="h-[400px] w-full [perspective:1000px]">
      <div
        className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* FRONTAL */}
        <div className="absolute inset-0 h-full w-full rounded-2xl text-center flex flex-col items-center justify-center p-8 hover:shadow-xl transition-all duration-300 [backface-visibility:hidden]"
          style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-4 rounded-2xl mb-6" style={{ background: 'rgba(102,0,51,0.15)', color: '#cc0044' }}>
            <Icon size={32} />
          </div>
          <h3 className="text-lg font-bold leading-tight mb-6 text-white">
            {item.title}
          </h3>
          <button
            onClick={() => setIsFlipped(true)}
            className="px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-md text-white"
            style={{ background: '#660033' }}
          >
            Saber Más
          </button>
        </div>

        {/* TRASERO */}
        <div className="absolute inset-0 h-full w-full rounded-2xl p-8 flex flex-col items-center justify-center gap-4 [transform:rotateY(180deg)] [backface-visibility:hidden] z-[20]"
          style={{ background: '#660033' }}>
          <p className="font-black uppercase text-sm text-center leading-tight text-white">
            {item.title}
          </p>
          <div className="w-10 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <p className="text-sm leading-relaxed text-center font-medium flex-1 flex items-center" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {item.description}
          </p>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFlipped(false); }}
            className="px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all text-white"
            style={{ border: '2px solid rgba(255,255,255,0.5)' }}
            onMouseEnter={e => { e.target.style.color = '#660033'; }}
            onMouseLeave={e => { e.target.style.color = '#fff'; }}
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

  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">

        {/* HEADER */}
        <header className="text-center mb-20" style={{ maxWidth: '1280px', margin: '0 auto 5rem', padding: '0 1.5rem' }}>
          <span className="font-black text-[10px] uppercase tracking-[0.3em]" style={{ color: '#cc0044' }}>
            Estudio Jurídico
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mt-4">
            Áreas de Práctica Legal
          </h1>
          <div className="w-24 h-1.5 mx-auto mt-8 rounded-full" style={{ background: '#660033' }} />
          <p className="mt-6 max-w-2xl mx-auto font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Asesoramiento legal integral con un enfoque preventivo y soluciones estratégicas para particulares, inversores y empresas. Hacé click en cada área para conocer más.
          </p>
        </header>

        {/* GRILLA FLIP CARDS */}
        <section style={{ maxWidth: '1280px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AREAS.map((area, i) => (
              <FlipCard key={i} item={area} />
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <div id="contacto" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">¿Tenés una consulta legal?</h2>
            <p className="mt-4 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>Contanos tu caso y te orientamos sin compromiso.</p>
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
