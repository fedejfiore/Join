"use client";

export default function NosotrosJoin({ data }) {
  const subtitulo = data?.subtitulo?.valor || data?.Subtitulo?.valor
    || 'Unimos una gestión inmobiliaria moderna con seguridad jurídica.';
  const texto = data?.texto?.valor || data?.Descripcion?.valor
    || 'Vender o alquilar una propiedad no es solo colocar un cartel o publicarla en internet. Implica una decisión patrimonial de alto valor que requiere precisión, estrategia y, sobre todo, conocimientos legales.\n\nNuestra propuesta surge de dos observaciones claras en el mercado. Por un lado, el agotamiento de los herederos —generalmente por errores de comunicación, demoras y costos extra— cuando tienen que contratar, por separado, un abogado para la sucesión y una inmobiliaria para la venta. Por el otro, la desconfianza de propietarios, compradores e inquilinos por no comprender los efectos legales y prácticos de la documentación que están firmando.\n\nEn JOIN venimos a superar la fragmentación del servicio tradicional y a unificar dos profesiones bajo un mismo techo, para transformar operaciones inmobiliarias —y procesos legales— en soluciones patrimoniales simples y claras. Porque entendemos que detrás de cada expediente hay una propiedad y, detrás de cada propiedad, una familia que busca resolver su situación con agilidad y transparencia.';
  const imagen = data?.imagen?.valor || data?.Imagen?.valor;
  const fundacion  = data?.fundacion?.valor;
  const operaciones = data?.operaciones?.valor;
  const clientes   = data?.clientes?.valor;

  const stats = [
    fundacion   && { label: 'Fundada en', value: fundacion },
    operaciones && { label: 'Operaciones', value: operaciones },
    clientes    && { label: 'Clientes', value: clientes },
  ].filter(Boolean);

  return (
    <section id="nosotros" className="section-dynamic">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* TEXTO */}
        <div className="space-y-6 order-2 lg:order-1">
          <h2 className="text-4xl md:text-5xl">Nosotros</h2>
          <h3 className="text-xl md:text-2xl !font-black !italic !uppercase !tracking-tighter">
            {subtitulo}
          </h3>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {texto.split('\n\n').map((p, i) => (
              <p key={i} className="font-medium">{p}</p>
            ))}
          </div>

          {stats.length > 0 && (
            <div className="flex gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-black text-primary dark:text-accent">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* IMAGEN */}
        <div className="order-1 lg:order-2 relative border-4 border-accent rounded-[3rem] p-3 bg-white dark:bg-slate-900 shadow-2xl">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-slate-800">
            {imagen ? (
              <img src={imagen} alt="Nosotros JOIN" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-black text-8xl tracking-[16px] text-slate-300 dark:text-slate-700">JOIN</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
