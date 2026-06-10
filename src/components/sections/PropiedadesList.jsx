"use client";

import { useState, useMemo } from 'react';

export default function PropiedadesList({ propiedades = [] }) {
  // Estados para filtros
  const [operacion, setOperacion] = useState('Todos');
  const [tipo, setTipo] = useState('Todos');
  const [ambientes, setAmbientes] = useState('Todos');
  const [dormitorios, setDormitorios] = useState('Todos');
  const [precioMaxUSD, setPrecioMaxUSD] = useState('');
  const [precioMaxARS, setPrecioMaxARS] = useState('');
  const [barrio, setBarrio] = useState('Todos');

  // Listar barrios dinámicamente
  const barriosDisponibles = useMemo(() => {
    const list = propiedades
      .map(p => p.Barrio)
      .filter((b, index, self) => b && self.indexOf(b) === index);
    return ['Todos', ...list];
  }, [propiedades]);

  // Tipos de propiedad fijos
  const tiposDisponibles = ['Todos', 'Departamento', 'Casa', 'PH', 'Local', 'Oficina', 'Terreno', 'Cochera'];

  // Limpiar filtros
  const handleClearFilters = () => {
    setOperacion('Todos');
    setTipo('Todos');
    setAmbientes('Todos');
    setDormitorios('Todos');
    setPrecioMaxUSD('');
    setPrecioMaxARS('');
    setBarrio('Todos');
  };

  // Lógica de filtrado
  const filteredProperties = useMemo(() => {
    let result = [...propiedades];

    // 1. Filtrar por Operación
    if (operacion !== 'Todos') {
      result = result.filter(p => p.Operacion?.toLowerCase() === operacion.toLowerCase());
    }

    // 2. Filtrar por Tipo
    if (tipo !== 'Todos') {
      result = result.filter(p => p.Tipo?.toLowerCase() === tipo.toLowerCase());
    }

    // 3. Filtrar por Barrio
    if (barrio !== 'Todos') {
      result = result.filter(p => p.Barrio?.toLowerCase() === barrio.toLowerCase());
    }

    // 4. Filtrar por Ambientes
    if (ambientes !== 'Todos') {
      if (ambientes === '5+') {
        result = result.filter(p => parseInt(p.Ambientes) >= 5);
      } else {
        result = result.filter(p => p.Ambientes === ambientes);
      }
    }

    // 5. Filtrar por Dormitorios
    if (dormitorios !== 'Todos') {
      if (dormitorios === '4+') {
        result = result.filter(p => parseInt(p.Dormitorios) >= 4);
      } else {
        result = result.filter(p => p.Dormitorios === dormitorios);
      }
    }

    // 6. Filtrar por Precio USD
    if (precioMaxUSD !== '') {
      const maxUSD = parseFloat(precioMaxUSD);
      result = result.filter(p => {
        if (p.Moneda === 'USD') {
          return parseFloat(p.Precio) <= maxUSD;
        }
        return true; // No descartamos ARS a menos que se implemente conversión
      });
    }

    // 7. Filtrar por Precio ARS
    if (precioMaxARS !== '') {
      const maxARS = parseFloat(precioMaxARS);
      result = result.filter(p => {
        if (p.Moneda === 'ARS') {
          return parseFloat(p.Precio) <= maxARS;
        }
        return true; // No descartamos USD
      });
    }

    // Ordenar: Las destacadas primero
    return result.sort((a, b) => {
      const destA = a.Destacada === 'SI' ? 1 : 0;
      const destB = b.Destacada === 'SI' ? 1 : 0;
      return destB - destA;
    });

  }, [propiedades, operacion, tipo, barrio, ambientes, dormitorios, precioMaxUSD, precioMaxARS]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* BARRA DE FILTROS */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-md border border-slate-100 dark:border-slate-800 mb-10 sticky top-28 z-40 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* OPERACION */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Operación</label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {['Todos', 'Venta', 'Alquiler'].map(op => (
                <button
                  key={op}
                  onClick={() => setOperacion(op)}
                  className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                    operacion === op 
                      ? 'bg-primary text-white dark:bg-accent dark:text-slate-950 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* TIPO */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Tipo de Propiedad</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl border border-transparent focus:border-primary dark:focus:border-accent text-xs font-bold outline-none"
            >
              {tiposDisponibles.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* BARRIO */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Barrio</label>
            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl border border-transparent focus:border-primary dark:focus:border-accent text-xs font-bold outline-none"
            >
              {barriosDisponibles.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* PRECIO HASTA */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Hasta USD</label>
              <input
                type="number"
                placeholder="Monto"
                value={precioMaxUSD}
                onChange={(e) => setPrecioMaxUSD(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl text-xs font-bold outline-none placeholder-slate-400"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Hasta ARS</label>
              <input
                type="number"
                placeholder="Monto"
                value={precioMaxARS}
                onChange={(e) => setPrecioMaxARS(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl text-xs font-bold outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* AMBIENTES */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Ambientes</label>
            <select
              value={ambientes}
              onChange={(e) => setAmbientes(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl border border-transparent focus:border-primary dark:focus:border-accent text-xs font-bold outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5 o más</option>
            </select>
          </div>

          {/* DORMITORIOS */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Dormitorios</label>
            <select
              value={dormitorios}
              onChange={(e) => setDormitorios(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-xl border border-transparent focus:border-primary dark:focus:border-accent text-xs font-bold outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4 o más</option>
            </select>
          </div>

          {/* BOTON RESET */}
          <div className="lg:col-span-2 flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
            >
              Limpiar Filtros
            </button>
          </div>

        </div>
      </div>

      {/* CONTADOR */}
      <div className="mb-8 text-center md:text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
        </p>
      </div>

      {/* GRID DE CARDS */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 font-black italic text-lg uppercase tracking-wider">No se encontraron propiedades que coincidan con los filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <article 
              key={prop.ID} 
              className="property-card bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              {/* GALERÍA: imagen principal con overlay de badges */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={prop.Foto_1 || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"} 
                  alt={prop.Titulo}
                  className="property-card-img w-full h-full object-cover" 
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">
                    {prop.Operacion}
                  </span>
                  {prop.Destacada === 'SI' && (
                    <span className="bg-amber-400 text-slate-900 text-[9px] font-black uppercase px-3 py-1 rounded-full">
                      ★ Destacada
                    </span>
                  )}
                </div>
                {/* BADGES de multimedia en esquina inferior */}
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {prop.URL_Video && <span className="bg-black/60 text-white text-[8px] font-black px-2 py-1 rounded-lg backdrop-blur-sm">▶ VIDEO</span>}
                  {prop.URL_Tour360 && <span className="bg-black/60 text-white text-[8px] font-black px-2 py-1 rounded-lg backdrop-blur-sm">360°</span>}
                  {prop.URL_Plano && <span className="bg-black/60 text-white text-[8px] font-black px-2 py-1 rounded-lg backdrop-blur-sm">PLANO</span>}
                </div>
              </div>

              {/* DATOS PRINCIPALES */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {prop.Tipo} · {prop.Barrio}
                      </p>
                      <h3 className="text-lg leading-tight mt-1 line-clamp-2">{prop.Titulo}</h3>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-primary dark:text-accent mt-2">
                    {prop.Moneda} {Number(prop.Precio).toLocaleString('es-AR')}
                  </p>
                  {prop.Expensas && (
                    <p className="text-[10px] text-slate-400 font-bold">+ ${Number(prop.Expensas).toLocaleString('es-AR')} expensas</p>
                  )}

                  {/* ICONOS DE CARACTERÍSTICAS */}
                  <div className="flex flex-wrap gap-4 mt-4 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {prop.Sup_Cubierta && <span>📐 {prop.Sup_Cubierta} m²</span>}
                    {prop.Ambientes && <span>🏠 {prop.Ambientes} amb.</span>}
                    {prop.Dormitorios && <span>🛏 {prop.Dormitorios} dorm.</span>}
                    {prop.Banos && <span>🚿 {prop.Banos} baños</span>}
                    {prop.Cocheras && prop.Cocheras !== '0' && <span>🚗 {prop.Cocheras} coch.</span>}
                  </div>
                </div>

                {/* CTA */}
                <a 
                  href={`/propiedades/${prop.Slug}`}
                  className="mt-6 block w-full text-center bg-primary dark:bg-accent text-white dark:text-slate-900 py-3 rounded-xl font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] transition-all"
                >
                  Ver propiedad
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
