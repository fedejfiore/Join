"use client";
import SheetText from '../../lib/sheet-text';

export default function NosotrosJoin({ data }) {
  const subtitulo = data?.subtitulo?.valor || data?.Subtitulo?.valor
    || 'Unimos una gestión inmobiliaria moderna con seguridad jurídica.';
  const texto = data?.texto?.valor || data?.Descripcion?.valor
    || 'Vender o alquilar una propiedad no es solo colocar un cartel o publicarla en internet. Implica una decisión patrimonial de alto valor que requiere precisión, estrategia y, sobre todo, conocimientos legales.\n\nNuestra propuesta surge de dos observaciones claras en el mercado. Por un lado, el agotamiento de los herederos —generalmente por errores de comunicación, demoras y costos extra— cuando tienen que contratar, por separado, un abogado para la sucesión y una inmobiliaria para la venta. Por el otro, la desconfianza de propietarios, compradores e inquilinos por no comprender los efectos legales y prácticos de la documentación que están firmando.\n\nEn JOIN venimos a superar la fragmentación del servicio tradicional y a unificar dos profesiones bajo un mismo techo, para transformar operaciones inmobiliarias —y procesos legales— en soluciones patrimoniales simples y claras.';
  const imagen = data?.imagen?.valor || data?.Imagen?.valor;
  const fundacion   = data?.fundacion?.valor;
  const operaciones = data?.operaciones?.valor;
  const clientes    = data?.clientes?.valor;

  const stats = [
    fundacion   && { label: 'Fundada en',  value: fundacion },
    operaciones && { label: 'Operaciones', value: operaciones },
    clientes    && { label: 'Clientes',    value: clientes },
  ].filter(Boolean);

  return (
    <section id="nosotros" className="section-dynamic">
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* TEXTO */}
          <div className="order-2 lg:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.15 }}>
              Nosotros
            </h2>
            <SheetText text={subtitulo} as="p" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.6, color: 'var(--text-secondary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.75, fontSize: '14px', color: 'var(--text-secondary)' }}>
              {texto.split('\n\n').map((p, i) => (
                <SheetText key={i} text={p} as="p" style={{ fontWeight: 500 }} />
              ))}
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'flex', gap: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--divider)' }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#cc0044' }}>{s.value}</p>
                    <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px', color: 'var(--text-muted)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IMAGEN */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(102,0,51,0.25)', boxShadow: '0 0 60px rgba(102,0,51,0.08)' }}>
              {imagen ? (
                <img src={imagen} alt="Nosotros JOIN" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'var(--card-bg)' }}>
                  <span style={{ fontWeight: 900, fontSize: '4rem', letterSpacing: '12px', color: 'rgba(102,0,51,0.18)' }}>JOIN</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
