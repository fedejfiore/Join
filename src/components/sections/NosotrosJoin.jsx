"use client";

export default function NosotrosJoin({ data }) {
  const subtitulo = data?.subtitulo?.valor || data?.Subtitulo?.valor
    || 'Unimos una gestión inmobiliaria moderna con seguridad jurídica.';
  const texto = data?.texto?.valor || data?.Descripcion?.valor
    || 'Vender o alquilar una propiedad no es solo colocar un cartel o publicarla en internet. Implica una decisión patrimonial de alto valor que requiere precisión, estrategia y, sobre todo, conocimientos legales.\n\nNuestra propuesta surge de dos observaciones claras en el mercado. Por un lado, el agotamiento de los herederos —generalmente por errores de comunicación, demoras y costos extra— cuando tienen que contratar, por separado, un abogado para la sucesión y una inmobiliaria para la venta. Por el otro, la desconfianza de propietarios, compradores e inquilinos por no comprender los efectos legales y prácticos de la documentación que están firmando.\n\nEn JOIN venimos a superar la fragmentación del servicio tradicional y a unificar dos profesiones bajo un mismo techo, para transformar operaciones inmobiliarias —y procesos legales— en soluciones patrimoniales simples y claras. Porque entendemos que detrás de cada expediente hay una propiedad y, detrás de cada propiedad, una familia que busca resolver su situación con agilidad y transparencia.';
  const imagen = data?.imagen?.valor || data?.Imagen?.valor;
  const fundacion   = data?.fundacion?.valor;
  const operaciones = data?.operaciones?.valor;
  const clientes    = data?.clientes?.valor;

  const stats = [
    fundacion   && { label: 'Fundada en',   value: fundacion },
    operaciones && { label: 'Operaciones',  value: operaciones },
    clientes    && { label: 'Clientes',     value: clientes },
  ].filter(Boolean);

  return (
    <section id="nosotros" className="section-dynamic">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* TEXTO */}
          <div className="space-y-7 order-2 lg:order-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#cc0044' }}>
              Quiénes Somos
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Nosotros</h2>
            <p className="text-lg md:text-xl font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {subtitulo}
            </p>
            <div className="space-y-5 leading-relaxed text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {texto.split('\n\n').map((p, i) => (
                <p key={i} className="font-medium">{p}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <div className="flex gap-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-3xl md:text-4xl font-black" style={{ color: '#cc0044' }}>{s.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IMAGEN */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(102,0,51,0.3)', boxShadow: '0 0 60px rgba(102,0,51,0.08)' }}>
              {imagen ? (
                <img src={imagen} alt="Nosotros JOIN" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: '#1c1c1e' }}>
                  <span className="font-black text-6xl tracking-[12px]" style={{ color: 'rgba(102,0,51,0.25)' }}>JOIN</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
