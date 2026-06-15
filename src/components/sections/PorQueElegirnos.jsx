"use client";
import { useState } from 'react';
import { Shield, Camera, Users } from 'lucide-react';

const RAZONES = [
  {
    num: '01',
    Icon: Shield,
    titulo: 'Mayor Seguridad Jurídica',
    intro: 'Tu tranquilidad no es un accesorio, es nuestra prioridad absoluta. A diferencia del modelo tradicional, en JOIN somos la inmobiliaria y el estudio jurídico en una sola estructura. Esta integración nos permite actuar con velocidad y precisión en cada etapa de la operación.',
    items: [
      {
        titulo: 'Acelerar procesos complejos',
        texto: 'Estudiamos las particularidades de cada caso, exploramos las alternativas viables y accionamos su implementación de forma inmediata.',
      },
      {
        titulo: 'Viabilizar operaciones difíciles',
        texto: 'Analizamos y destrabamos casos que otras agencias suelen rechazar por falta de especialización técnica en derecho inmobiliario.',
      },
      {
        titulo: 'Garantizar cierres seguros',
        texto: 'Cada documento que firmás cuenta con el respaldo de expertos que comprenden tanto el mercado inmobiliario como el marco legal que lo rige.',
      },
    ],
  },
  {
    num: '02',
    Icon: Camera,
    titulo: 'Comercialización de Vanguardia',
    intro: 'Utilizamos tecnología para transformar cada inmueble en una experiencia inmersiva para los compradores y acelerar la toma de decisiones. En el mercado actual, la producción multimedia de alta calidad es indispensable.',
    items: [
      {
        titulo: 'Fotografía de Alta Calidad',
        texto: 'Capturamos la esencia y los mejores ángulos de tu propiedad con equipos de nivel editorial, garantizando una primera impresión inmejorable en los buscadores.',
      },
      {
        titulo: 'Video Recorrido',
        texto: 'Realizamos piezas audiovisuales dinámicas que permiten al interesado "caminar" la propiedad desde su dispositivo, generando un vínculo emocional inmediato.',
      },
      {
        titulo: 'Plano Ilustrativo',
        texto: 'Aportamos claridad técnica. Un plano claro ayuda al comprador a visualizar la distribución y el potencial del espacio, filtrando consultas poco calificadas.',
      },
      {
        titulo: 'Tour Virtual 360°',
        texto: 'Permitimos inspeccionar cada rincón de la propiedad con total libertad, las 24 horas del día, desde cualquier lugar del mundo. Ideal para inversores o compradores a distancia.',
      },
      {
        titulo: 'Amoblamiento Virtual',
        texto: '¿La propiedad está vacía o requiere refacciones? Utilizamos tecnología 3D para mostrar todo su potencial de habitabilidad y ayudar al comprador a proyectar su futuro hogar.',
      },
    ],
  },
  {
    num: '03',
    Icon: Users,
    titulo: 'Socio Estratégico',
    intro: 'No solo gestionamos propiedades; resolvemos los obstáculos legales que te impiden disponer de ellas. Somos el aliado clave para quienes necesitan iniciar una sucesión —u otro proceso judicial— como paso previo obligatorio para concretar una venta.',
    items: [
      {
        titulo: 'Interlocutor Único',
        texto: 'Se evitan los "teléfonos descompuestos" entre profesionales. Nos encargamos de todo el ciclo: desde el inicio de la sucesión hasta la firma de la escritura traslativa de dominio.',
      },
      {
        titulo: 'Facilidad de Honorarios',
        texto: 'Apostamos al resultado y alineamos nuestros incentivos con los tuyos. Nuestros honorarios profesionales se cancelan al concretar la operación inmobiliaria.',
      },
      {
        titulo: 'Especialización',
        texto: 'No somos generalistas. Somos expertos en el mercado de sucesiones, lo que nos permite anticiparnos a los conflictos y acelerar los plazos mediante herramientas como el tracto abreviado.',
      },
    ],
  },
];

export default function PorQueElegirnos() {
  const [active, setActive] = useState(0);
  const razon = RAZONES[active];
  const { Icon } = razon;

  return (
    <section id="valores" className="section-dynamic">
      <div className="max-w-7xl mx-auto">

        {/* ENCABEZADO */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl mb-4">¿Por qué elegirnos?</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium italic text-sm md:text-base">
            Porque ofrecemos un servicio integrador y profesional que es escaso en el mercado inmobiliario y genera ahorros y agilidad a nuestros clientes.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center flex-wrap">
          {RAZONES.map((r, i) => {
            const I = r.Icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-7 py-4 rounded-2xl transition-all duration-300 text-left ${
                  active === i
                    ? 'bg-primary dark:bg-accent text-white dark:text-slate-900 shadow-xl scale-[1.03]'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-accent'
                }`}
              >
                <I size={18} className="shrink-0" />
                <span className="font-black uppercase text-[11px] tracking-wider leading-tight">
                  {r.num}. {r.titulo}
                </span>
              </button>
            );
          })}
        </div>

        {/* PANEL DE CONTENIDO */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-14 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300">
          <div className="flex items-start gap-5 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-primary dark:text-accent shrink-0">
              <Icon size={28} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl mb-2">{razon.titulo}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm leading-relaxed">
                {razon.intro}
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-4 ${razon.items.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {razon.items.map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-primary dark:bg-accent text-white dark:text-slate-900 flex items-center justify-center text-[10px] font-black shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="font-black italic uppercase text-[11px] tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
                    {item.titulo}
                  </p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium italic leading-relaxed">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
