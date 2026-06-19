"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const MapaListado = dynamic(() => import('./MapaListado'), { ssr: false, loading: () => (
  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
    Cargando mapa…
  </div>
) });

export default function PropiedadesList({ propiedades = [] }) {
  const [operacion, setOperacion] = useState('Todos');
  const [tipo, setTipo] = useState('Todos');
  const [ambientes, setAmbientes] = useState('Todos');
  const [dormitorios, setDormitorios] = useState('Todos');
  const [precioMaxUSD, setPrecioMaxUSD] = useState('');
  const [precioMaxARS, setPrecioMaxARS] = useState('');
  const [barrio, setBarrio] = useState('Todos');

  const barriosDisponibles = useMemo(() => {
    const list = propiedades
      .map(p => p.Barrio)
      .filter((b, index, self) => b && self.indexOf(b) === index);
    return ['Todos', ...list];
  }, [propiedades]);

  const tiposDisponibles = ['Todos', 'Departamento', 'Casa', 'PH', 'Local', 'Oficina', 'Terreno', 'Cochera'];

  const handleClearFilters = () => {
    setOperacion('Todos'); setTipo('Todos'); setAmbientes('Todos');
    setDormitorios('Todos'); setPrecioMaxUSD(''); setPrecioMaxARS(''); setBarrio('Todos');
  };

  const filteredProperties = useMemo(() => {
    let result = [...propiedades];
    if (operacion !== 'Todos') result = result.filter(p => p.Operacion?.toLowerCase() === operacion.toLowerCase());
    if (tipo !== 'Todos') result = result.filter(p => p.Tipo?.toLowerCase() === tipo.toLowerCase());
    if (barrio !== 'Todos') result = result.filter(p => p.Barrio?.toLowerCase() === barrio.toLowerCase());
    if (ambientes !== 'Todos') {
      if (ambientes === '5+') result = result.filter(p => parseInt(p.Ambientes) >= 5);
      else result = result.filter(p => p.Ambientes === ambientes);
    }
    if (dormitorios !== 'Todos') {
      if (dormitorios === '4+') result = result.filter(p => parseInt(p.Dormitorios) >= 4);
      else result = result.filter(p => p.Dormitorios === dormitorios);
    }
    if (precioMaxUSD !== '') {
      const maxUSD = parseFloat(precioMaxUSD);
      result = result.filter(p => p.Moneda === 'USD' ? parseFloat(p.Precio) <= maxUSD : true);
    }
    if (precioMaxARS !== '') {
      const maxARS = parseFloat(precioMaxARS);
      result = result.filter(p => p.Moneda === 'ARS' ? parseFloat(p.Precio) <= maxARS : true);
    }
    return result.sort((a, b) => (b.Destacada === 'SI' ? 1 : 0) - (a.Destacada === 'SI' ? 1 : 0));
  }, [propiedades, operacion, tipo, barrio, ambientes, dormitorios, precioMaxUSD, precioMaxARS]);

  const selectStyle = {
    width: '100%',
    background: 'var(--card-inner-bg)',
    border: '1px solid var(--card-inner-border)',
    color: 'var(--text-strong)',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '12px',
    fontWeight: 700,
    outline: 'none',
    fontFamily: 'inherit',
  };

  const inputStyle = {
    ...selectStyle,
    width: '100%',
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem' }}>

      {/* BARRA DE FILTROS — sticky solo en desktop, scroll normal en mobile */}
      <div className="prop-filter" style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '1.25rem',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        position: 'sticky',
        top: '88px',
        zIndex: 40,
      }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {/* OPERACIÓN */}
          <div className="col-span-2 md:col-span-1">
            <label style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Operación
            </label>
            <div style={{ display: 'flex', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', padding: '3px', borderRadius: '0.6rem' }}>
              {['Todos', 'Venta', 'Alquiler'].map(op => (
                <button key={op} onClick={() => setOperacion(op)} style={{
                  flex: 1, textAlign: 'center', padding: '0.5rem', borderRadius: '0.45rem', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: operacion === op ? '#660033' : 'transparent',
                  color: operacion === op ? '#fff' : 'var(--text-secondary)',
                }}>
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* TIPO */}
          <div>
            <label style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Tipo</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} style={selectStyle}>
              {tiposDisponibles.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* BARRIO */}
          <div>
            <label style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Barrio</label>
            <select value={barrio} onChange={e => setBarrio(e.target.value)} style={selectStyle}>
              {barriosDisponibles.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* AMBIENTES */}
          <div>
            <label style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Ambientes</label>
            <select value={ambientes} onChange={e => setAmbientes(e.target.value)} style={selectStyle}>
              <option value="Todos">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          {/* PRECIO + LIMPIAR */}
          <div className="col-span-2 md:col-span-1">
            <label style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Hasta</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="number" placeholder="USD" value={precioMaxUSD} onChange={e => setPrecioMaxUSD(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <input type="number" placeholder="ARS" value={precioMaxARS} onChange={e => setPrecioMaxARS(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={handleClearFilters} style={{
              width: '100%', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)',
              color: 'var(--text-secondary)', padding: '0.75rem', borderRadius: '0.75rem',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Limpiar
            </button>
          </div>

        </div>
      </div>

      {/* CONTADOR */}
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
      </p>

      {/* LAYOUT: LISTA IZQUIERDA + MAPA DERECHA */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-8">

        {/* LISTA */}
        <div>
          {filteredProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem' }}>
              <p style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '15px' }}>No se encontraron propiedades con esos filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((prop) => (
                <article
                  key={prop.ID}
                  className="property-card group"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s' }}
                >
                  {/* IMAGEN */}
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={prop.Foto_1 || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"}
                      alt={prop.Titulo}
                      className="property-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ background: '#660033', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '9999px' }}>
                        {prop.Operacion}
                      </span>
                      {prop.Destacada === 'SI' && (
                        <span style={{ background: '#f59e0b', color: '#111', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '9999px' }}>
                          ★ Destacada
                        </span>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.375rem' }}>
                      {prop.URL_Video && <span style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '8px', fontWeight: 900, padding: '3px 7px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>▶ VIDEO</span>}
                      {prop.URL_Tour360 && <span style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '8px', fontWeight: 900, padding: '3px 7px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>360°</span>}
                    </div>
                  </div>

                  {/* DATOS */}
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                        {prop.Tipo} · {prop.Barrio}
                      </p>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--text-strong)', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {prop.Titulo}
                      </h3>
                      <p style={{ fontSize: '1.375rem', fontWeight: 900, color: '#660033', marginBottom: '2px' }}>
                        {prop.Moneda} {Number(prop.Precio).toLocaleString('es-AR')}
                      </p>
                      {prop.Expensas && (
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                          + ${Number(prop.Expensas).toLocaleString('es-AR')} expensas
                        </p>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginTop: '1rem', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {prop.Sup_Cubierta && <span>📐 {prop.Sup_Cubierta} m²</span>}
                        {prop.Ambientes && <span>🏠 {prop.Ambientes} amb.</span>}
                        {prop.Dormitorios && <span>🛏 {prop.Dormitorios} dorm.</span>}
                        {prop.Banos && <span>🚿 {prop.Banos} baños</span>}
                        {prop.Cocheras && prop.Cocheras !== '0' && <span>🚗 {prop.Cocheras} coch.</span>}
                      </div>
                    </div>
                    <a
                      href={`/propiedades/${prop.Slug}`}
                      style={{ display: 'block', textAlign: 'center', background: '#660033', color: '#fff', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '1.25rem', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Ver propiedad
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* MAPA — sticky, oculto en mobile */}
        <div className="hidden lg:block" style={{ position: 'sticky', top: '180px', height: 'calc(100vh - 200px)', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
          <MapaListado propiedades={filteredProperties} />
        </div>

      </div>
      <div style={{ height: '4rem' }} />
    </div>
  );
}
