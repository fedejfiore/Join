import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContactoJoin from '../components/sections/ContactoJoin';
import { getAllSiteData } from '../lib/google-sheets';
import { Users, FileText, Gavel, ShieldAlert, Landmark, Search, Heart, Scale, Briefcase } from 'lucide-react';

export default function JuridicoPage({ data }) {
  if (!data) return null;

  const areas = [
    {
      title: "Sucesiones y Herencias",
      description: "Llevamos adelante juicios sucesorios, declaratorias de herederos, inscripción de bienes y particiones, simplificando trámites complejos de forma ágil y empática.",
      icon: Users
    },
    {
      title: "Contratos Inmobiliarios",
      description: "Redacción y revisión minuciosa de contratos de locación comercial y residencial, convenios, cesiones de derechos y boletos de compraventa a medida.",
      icon: FileText
    },
    {
      title: "Asesoramiento en Desalojos",
      description: "Acciones legales frente a la falta de pago, vencimiento de contrato o intrusiones. Te acompañamos en mediaciones y en las etapas judiciales correspondientes.",
      icon: Gavel
    },
    {
      title: "Boleto de Compraventa y Señas",
      description: "Garantizamos tu inversión inmobiliaria estructurando señas, reservas y boletos con total respaldo legal para proteger tu patrimonio de punta a punta.",
      icon: ShieldAlert
    },
    {
      title: "Usucapión y Prescripción Adquisitiva",
      description: "Regularización dominial de inmuebles poseídos durante el plazo que estipula la ley para la obtención judicial del título de propiedad definitivo.",
      icon: Landmark
    },
    {
      title: "Estudio de Títulos y Due Diligence",
      description: "Análisis preventivo exhaustivo de escrituras, inhibiciones, gravámenes y antecedentes registrales antes de que firmes una compraventa.",
      icon: Search
    },
    {
      title: "Derecho de Familia",
      description: "Trámite rápido de divorcios express, convenios reguladores de bienes, régimen de comunicación, alimentos y liquidación de sociedad conyugal.",
      icon: Heart
    },
    {
      title: "Derecho Civil y Comercial",
      description: "Cobro ejecutivo de deudas y expensas, reclamos judiciales y extrajudiciales por daños y perjuicios, redacción de cartas documento y mediación civil.",
      icon: Scale
    },
    {
      title: "Asesoría Corporativa y PyMEs",
      description: "Constitución de sociedades, marcas, asesoramiento contractual recurrente para empresas y representación legal ante Defensa del Consumidor.",
      icon: Briefcase
    }
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
            Áreas de Práctica Legal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-medium italic">
            Ofrecemos asesoramiento legal integral con un enfoque preventivo y soluciones estratégicas para particulares, inversores y empresas.
          </p>
          <div className="w-24 h-2 bg-primary dark:bg-accent mx-auto mt-6 rounded-full transition-colors"></div>
        </header>

        {/* GRILLA DE AREAS DE PRACTICA (FLIP CARDS) */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, i) => (
              <FlipCard key={i} item={area} />
            ))}
          </div>
        </section>

        {/* FORMULARIO DE CONTACTO */}
        <div id="contacto" className="max-w-7xl mx-auto px-6">
          <ContactoJoin brand={data.brand} defaultTema="Otra consulta legal" />
        </div>

      </div>
    </Layout>
  );
}

function FlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = item.icon;

  return (
    <div className="h-[380px] w-full [perspective:1000px]">
      <div 
        className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* LADO FRONTAL */}
        <div className="absolute inset-0 h-full w-full rounded-[2.5rem] bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center p-8 shadow-sm hover:shadow-xl transition-all duration-300 [backface-visibility:hidden] border border-slate-150 dark:border-slate-800">
          <div className="p-4 bg-slate-100 dark:bg-slate-850 rounded-2xl text-primary dark:text-accent mb-6">
            <Icon size={32} />
          </div>
          <h3 className="text-xl font-black italic uppercase leading-tight mb-6 text-slate-800 dark:text-slate-100">
            {item.title}
          </h3>
          <button 
            onClick={() => setIsFlipped(true)}
            className="bg-primary dark:bg-accent text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-md"
          >
            Saber Más
          </button>
        </div>

        {/* LADO TRASERO */}
        <div className="absolute inset-0 h-full w-full rounded-[2.5rem] bg-primary dark:bg-slate-900 text-white p-8 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] z-[20]">
          <p className="text-sm leading-relaxed text-center mb-6 font-medium italic">
            {item.description}
          </p>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="relative z-[50] mt-auto border-2 border-white/50 text-white px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-primary transition-all pointer-events-auto"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data } };
  } catch (e) {
    console.error("Error at juridico getServerSideProps:", e);
    return { props: { data: null } };
  }
}
