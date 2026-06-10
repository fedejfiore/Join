"use client";
import { useState, useEffect } from 'react';

export default function ContactoJoin({ brand, defaultTema = "", propiedadInfo = "" }) {
  const [tema, setTema] = useState(defaultTema || "Pedir una tasación");

  useEffect(() => {
    if (defaultTema) {
      setTema(defaultTema);
    }
  }, [defaultTema]);

  return (
    <section id="contacto" className="section-dynamic">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO Y MAPA */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl leading-none">
            Comunicate <br/> con nosotros
          </h2>
          <div className="space-y-4">
            <InfoBox label="Teléfono" value={brand?.whatsapp?.valor || "11-2682-0000"} />
            <InfoBox label="E-mail" value={brand?.Mail?.valor || "hola@ejoin.com.ar"} />
            <InfoBox label="Dirección" value={brand?.Direccion?.valor || "Mercedes 255 7° 'A', CABA"} />
          </div>
          
          <div className="rounded-[2rem] overflow-hidden h-64 border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200">
             <iframe 
               src={brand?.Direccion_maps?.valor || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.844787948604!2d-58.4907293!3d-34.6080838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabb79624e5b%3A0x867702f2674e0d69!2sMercedes%20255%2C%20C1407%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000"} 
               width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
             </iframe>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-2xl text-center mb-8">Dejanos tu consulta</h3>
          
          <form action={brand?.Formspree?.valor || "https://formspree.io/f/xojkjron"} method="POST" className="space-y-6">
            {propiedadInfo && <input type="hidden" name="propiedad" value={propiedadInfo} />}
            
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Nombre" 
                  required 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="tel" 
                  name="telefono" 
                  placeholder="Teléfono" 
                  required 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none" 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none" 
                />
              </div>
              <div>
                <select 
                  name="tema" 
                  value={tema} 
                  onChange={(e) => setTema(e.target.value)} 
                  required 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none"
                >
                  <option value="Pedir una tasación">Pedir una tasación</option>
                  <option value="Consultar por sucesión">Consultar por sucesión</option>
                  <option value="Otra consulta legal">Otra consulta legal</option>
                  <option value="Me interesa una propiedad">Me interesa una propiedad</option>
                </select>
              </div>
              <div>
                <textarea 
                  name="consulta" 
                  rows={4} 
                  placeholder="Tu consulta" 
                  required 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none resize-none" 
                />
              </div>
            </div>

            <button type="submit" className="btn-submit w-full py-4 rounded-xl">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-l-8 border-primary dark:border-accent shadow-lg">
      <p className="text-[9px] font-black text-slate-400 uppercase">{label}</p>
      <p className="font-bold text-lg text-slate-800 dark:text-white">{value}</p>
    </div>
  );
}
