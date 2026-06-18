"use client";
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactoJoin({ brand, defaultTema = "", propiedadInfo = "" }) {
  const [tema, setTema] = useState(defaultTema || "Pedir una tasación");

  useEffect(() => {
    if (defaultTema) setTema(defaultTema);
  }, [defaultTema]);

  const sheetFormspree = brand?.Formspree?.valor || '';
  const formAction = sheetFormspree.startsWith('https://formspree.io/') ? sheetFormspree : 'https://formspree.io/f/mbdebywn';

  const whatsapp  = brand?.whatsapp?.valor  || "11-2682-0000";
  const email     = brand?.Mail?.valor      || brand?.email?.valor    || "hola@ejoin.com.ar";
  const direccion = brand?.Direccion?.valor || brand?.direccion?.valor || "Mercedes 255 7° 'A', CABA";
  const mapsUrl   = brand?.Direccion_maps?.valor || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.844787948604!2d-58.4907293!3d-34.6080838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabb79624e5b%3A0x867702f2674e0d69!2sMercedes%20255%2C%20C1407%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000";

  const fieldStyle = {
    background: 'var(--card-inner-bg)',
    border: '1px solid var(--card-inner-border)',
    color: 'var(--text-strong)',
    borderRadius: '0.75rem',
    padding: '0.875rem 1rem',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contacto" className="section-dynamic">
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* COLUMNA IZQUIERDA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#cc0044', marginBottom: '1rem' }}>
                Contacto
              </p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.2 }}>
                Comunicate<br />con nosotros
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InfoBox icon={Phone}  label="Teléfono"  value={whatsapp} />
              <InfoBox icon={Mail}   label="E-mail"    value={email} />
              <InfoBox icon={MapPin} label="Dirección" value={direccion} />
            </div>

            <div className="rounded-xl overflow-hidden" style={{ height: '260px', border: '1px solid var(--card-border)' }}>
              <iframe src={mapsUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-strong)', textAlign: 'center', marginBottom: '2rem' }}>
              Dejanos tu consulta
            </h3>

            <form action={formAction} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {propiedadInfo && <input type="hidden" name="propiedad" value={propiedadInfo} />}

              <input type="text" name="nombre" placeholder="Nombre" required style={fieldStyle} />

              <div className="grid md:grid-cols-2 gap-3">
                <input type="tel" name="telefono" placeholder="Teléfono" required style={fieldStyle} />
                <input type="email" name="email" placeholder="Email" required style={fieldStyle} />
              </div>

              <select name="tema" value={tema} onChange={(e) => setTema(e.target.value)} required style={fieldStyle}>
                <option value="Pedir una tasación">Pedir una tasación</option>
                <option value="Consultar por sucesión">Consultar por sucesión</option>
                <option value="Otra consulta legal">Otra consulta legal</option>
                <option value="Me interesa una propiedad">Me interesa una propiedad</option>
              </select>

              <textarea
                name="consulta" rows={4} placeholder="Tu consulta" required
                style={{ ...fieldStyle, resize: 'none' }}
              />

              <button type="submit"
                style={{ background: '#660033', color: '#ffffff', width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '13px', border: 'none', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 4px 20px rgba(102,0,51,0.5)'; }}
                onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.125rem 1.25rem', borderRadius: '12px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', borderLeft: '3px solid #660033' }}>
      <div style={{ color: '#cc0044', flexShrink: 0 }}><Icon size={20} /></div>
      <div>
        <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>{label}</p>
        <p style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: '14px', marginTop: '2px' }}>{value}</p>
      </div>
    </div>
  );
}
