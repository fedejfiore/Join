"use client";
import { useState } from 'react';

export default function Contact({ config }) {
  const [unidades, setUnidades] = useState(0);
  const [locales, setLocales] = useState(0);
  const [cocheras, setCocheras] = useState(0);

  const serviciosList = ["Agua caliente", "Calefacción Central", "Lavandería", "S.U.M.", "Seguridad Privada", "Piscina/Solarium", "Zonas parquizadas", "Parrilla", "Gimnasio", "Sauna"];
  const rangosAntiguedad = ["0-20", "21-40", "41-60", "61-80", "81-99", "+ 100"];

  return (
    <section id="contacto" className="section-dynamic">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl leading-none">Comunicate <br/> con nosotros</h2>
          <div className="space-y-4">
            <InfoBox label="Teléfono" value="11-7896-0000" />
            <InfoBox label="E-mail" value="administracion@adomus.com.ar" />
            <InfoBox label="Dirección" value="Mercedes 255 7° 'A', CABA" />
          </div>
          
          {/* MAPA RESTAURADO: Usamos una URL de Embed estándar */}
          <div className="rounded-[2rem] overflow-hidden h-64 border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.844787948604!2d-58.4907293!3d-34.6080838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabb79624e5b%3A0x867702f2674e0d69!2sMercedes%20255%2C%20C1407%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000" 
               width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
             </iframe>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-2xl text-center mb-8">Solicita tu presupuesto</h3>
          
          <form action="https://formspree.io/f/xojkjron" method="POST" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="nombre" placeholder="Nombre" required className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full outline-none" />
              <input name="apellido" placeholder="Apellido" required className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full" />
              <input name="email" type="email" placeholder="Correo electrónico" required className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white md:col-span-2 w-full" />
              <input name="telefono" type="tel" placeholder="Teléfono" required className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full" />
              <input name="direccion_edificio" placeholder="Dirección del Edificio" className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <CounterField label="Unidades" val={unidades} set={setUnidades} name="unidades" />
              <CounterField label="Locales" val={locales} set={setLocales} name="locales" />
              <CounterField label="Cocheras" val={cocheras} set={setCocheras} name="cocheras" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <select name="empleados" className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full"><option>Empleados: No tiene</option><option>1</option><option>2</option><option>3 o mas</option></select>
              <select name="limpieza" className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white w-full"><option>Servicio de limpieza: Si</option><option>No</option></select>
            </div>

            {/* CHECKBOXES DE SERVICIOS CENTRALES */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Servicios Centrales</p>
              <div className="grid grid-cols-2 gap-2">
                {serviciosList.map(s => (
                  <label key={s} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <span className="text-[10px] text-slate-700 dark:text-slate-200">{s}</span>
                    <input type="checkbox" name="servicios" value={s} className="accent-accent" />
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-submit w-full py-4 rounded-xl">
              Pedir Presupuesto
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function CounterField({ label, val, set, name }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
      <label className="text-[9px] font-bold text-slate-400 uppercase mb-2">{label}</label>
      <input type="hidden" name={name} value={val} />
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set(Math.max(0, val - 1))} className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-lg font-bold">-</button>
        <span className="font-black text-slate-800 dark:text-white">{val}</span>
        <button type="button" onClick={() => set(val + 1)} className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-lg font-bold">+</button>
      </div>
    </div>
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