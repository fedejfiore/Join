"use client";
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactoJoin({ brand, defaultTema = "", propiedadInfo = "" }) {
  const [tema, setTema] = useState(defaultTema || "Pedir una tasación");

  useEffect(() => {
    if (defaultTema) setTema(defaultTema);
  }, [defaultTema]);

  const whatsapp  = brand?.whatsapp?.valor  || "11-2682-0000";
  const email     = brand?.Mail?.valor      || brand?.email?.valor    || "hola@ejoin.com.ar";
  const direccion = brand?.Direccion?.valor || brand?.direccion?.valor || "Mercedes 255 7° 'A', CABA";
  const mapsUrl   = brand?.Direccion_maps?.valor || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.844787948604!2d-58.4907293!3d-34.6080838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabb79624e5b%3A0x867702f2674e0d69!2sMercedes%20255%2C%20C1407%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000";

  const fieldStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f0f0f0',
    borderRadius: '0.75rem',
    padding: '1rem',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '14px',
  };

  return (
    <section id="contacto" className="section-dynamic">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="grid lg:grid-cols-2 gap-16">

          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#cc0044' }}>
                Contacto
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Comunicate<br/>con nosotros
              </h2>
            </div>

            <div className="space-y-4">
              <InfoBox icon={Phone} label="Teléfono"  value={whatsapp} />
              <InfoBox icon={Mail}  label="E-mail"    value={email} />
              <InfoBox icon={MapPin} label="Dirección" value={direccion} />
            </div>

            <div className="rounded-xl overflow-hidden h-64"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe src={mapsUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="rounded-2xl p-8 md:p-10"
            style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-2xl font-bold text-white text-center mb-8">Dejanos tu consulta</h3>

            <form action={brand?.Formspree?.valor || "https://formspree.io/f/xojkjron"} method="POST" className="space-y-4">
              {propiedadInfo && <input type="hidden" name="propiedad" value={propiedadInfo} />}

              <input type="text" name="nombre" placeholder="Nombre" required style={fieldStyle} />

              <div className="grid md:grid-cols-2 gap-4">
                <input type="tel" name="telefono" placeholder="Teléfono" required style={fieldStyle} />
                <input type="email" name="email" placeholder="Email" required style={fieldStyle} />
              </div>

              <select
                name="tema"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                required
                style={fieldStyle}
              >
                <option value="Pedir una tasación">Pedir una tasación</option>
                <option value="Consultar por sucesión">Consultar por sucesión</option>
                <option value="Otra consulta legal">Otra consulta legal</option>
                <option value="Me interesa una propiedad">Me interesa una propiedad</option>
              </select>

              <textarea
                name="consulta"
                rows={4}
                placeholder="Tu consulta"
                required
                style={{ ...fieldStyle, resize: 'none' }}
              />

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: '#660033', color: '#ffffff' }}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: '3px solid #660033',
      }}>
      <div style={{ color: '#cc0044' }}><Icon size={20} /></div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
