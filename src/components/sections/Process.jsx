"use client";
import SheetText from '../../lib/sheet-text';

export default function Process({ pasos = [] }) {
  const items = Array.isArray(pasos) ? pasos.filter(p => {
    const keys = Object.keys(p);
    const onOffKey = keys.find(k => k.trim().toUpperCase() === 'ON/OFF');
    const status = onOffKey ? p[onOffKey] : 'ON';
    return status?.toString().toUpperCase() === 'ON';
  }).map((p, index) => {
    const getVal = (nombres) => {
      const foundKey = Object.keys(p).find(k => nombres.includes(k.trim().toLowerCase()));
      return foundKey ? p[foundKey] : "";
    };
    return {
      paso: getVal(['paso', 'n', 'id']) || index + 1,
      titulo: getVal(['titulo', 'title', 'nombre']),
      descripcion: getVal(['descripcion', 'desc', 'texto']),
      imagen: getVal(['imagen', 'img', 'foto', 'image'])
    };
  }).filter(item => item.titulo) : [];

  if (items.length === 0) return null;

  return (
    <section id="proceso" className="section-dynamic overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl">
            Nuestro Proceso de Gestión
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800/50 -translate-x-1/2" />
          <div className="space-y-24 md:space-y-32">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* CÍRCULO CON NÚMERO CELESTE */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-accent text-white dark:text-slate-950 rounded-full items-center justify-center font-black z-10 shadow-xl border-4 border-white dark:border-[#0a192f] transition-all">
                    {item.paso}
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                      {item.imagen && <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover" />}
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 space-y-4 relative text-left ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <span className={`hidden md:block absolute -top-12 ${isEven ? 'left-12' : 'right-12'} text-9xl font-black text-slate-100 dark:text-accent/5 pointer-events-none`}>0{item.paso}</span>
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                        <span className="bg-accent text-white dark:text-slate-950 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">{item.paso}</span>
                    </div>
                    <h3 className="text-3xl relative">{item.titulo}</h3>
                    <div className="relative prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium text-left">
                      <SheetText as="div" text={item.descripcion} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}