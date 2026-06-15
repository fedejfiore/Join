"use client";

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import Layout from '../../components/layout/Layout';
import ContactoJoin from '../../components/sections/ContactoJoin';
import { getAllSiteData } from '../../lib/google-sheets';
import { ChevronLeft, ChevronRight, X, Grid, Film, Compass, MapPin } from 'lucide-react';

const containerStyle = { maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' };

export default function PropertyDetail({ property, data }) {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState('fotos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photos = [
    property.Foto_1, property.Foto_2, property.Foto_3, property.Foto_4, property.Foto_5,
    property.Foto_6, property.Foto_7, property.Foto_8, property.Foto_9, property.Foto_10
  ].filter(Boolean);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) return `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0]}`;
    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]?.split('?')[0]}`;
    return url;
  };

  const videoEmbed = getEmbedUrl(property.URL_Video);
  const prevPhoto = (e) => { e.stopPropagation(); setLightboxIndex(prev => prev === 0 ? photos.length - 1 : prev - 1); };
  const nextPhoto = (e) => { e.stopPropagation(); setLightboxIndex(prev => prev === photos.length - 1 ? 0 : prev + 1); };
  const propiedadInfo = `${property.Titulo} (${property.Direccion || property.Barrio})`;

  const tabActiveStyle = { background: '#660033', color: '#fff', boxShadow: '0 2px 8px rgba(102,0,51,0.35)' };
  const tabInactiveStyle = { background: 'var(--card-inner-bg)', color: 'var(--text-secondary)', border: '1px solid var(--card-inner-border)' };

  return (
    <Layout data={data}>
      <div className="min-h-screen" style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>

        {/* BREADCRUMB + HEADER */}
        <div style={{ ...containerStyle, marginBottom: '2.5rem' }}>
          <Link href="/propiedades" style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#660033'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ChevronLeft size={16} /> Volver a Propiedades
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', borderBottom: '1px solid var(--divider)', paddingBottom: '2rem' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                <span style={{ background: '#660033', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '9999px' }}>
                  {property.Operacion}
                </span>
                {property.Destacada === 'SI' && (
                  <span style={{ background: '#f59e0b', color: '#111', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '9999px' }}>
                    ★ Destacada
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: 'clamp(1.625rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                {property.Titulo}
              </h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.625rem' }}>
                <MapPin size={15} /> {property.Direccion ? `${property.Direccion}, ` : ''}{property.Barrio}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>Valor de publicación</p>
              <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: '#660033', marginTop: '4px' }}>
                {property.Moneda} {Number(property.Precio).toLocaleString('es-AR')}
              </p>
              {property.Expensas && (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
                  + ${Number(property.Expensas).toLocaleString('es-AR')} expensas
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PESTAÑAS MULTIMEDIA */}
        <div style={{ ...containerStyle, marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--divider)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            {[
              { key: 'fotos', label: `Fotos (${photos.length})`, icon: <Grid size={15} />, show: true },
              { key: 'video', label: 'Video Tour',              icon: <Film size={15} />, show: !!videoEmbed },
              { key: 'tour',  label: 'Tour 360°',               icon: <Compass size={15} />, show: !!property.URL_Tour360 },
              { key: 'plano', label: 'Plano',                   icon: <span>📐</span>, show: !!property.URL_Plano },
            ].filter(t => t.show).map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.625rem 1.25rem', borderRadius: '9999px',
                fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                ...(activeTab === tab.key ? tabActiveStyle : tabInactiveStyle),
              }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENIDO MULTIMEDIA */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '1.25rem', minHeight: '360px' }}>
            {activeTab === 'fotos' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {photos.map((url, i) => (
                  <div key={i} onClick={() => setLightboxIndex(i)} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '0.875rem', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--card-border)' }}>
                    <img src={url} alt={`Foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'video' && videoEmbed && (
              <div style={{ aspectRatio: '16/9', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <iframe src={videoEmbed} style={{ width: '100%', height: '100%', border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            )}
            {activeTab === 'tour' && property.URL_Tour360 && (
              <div style={{ height: '500px', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <iframe src={property.URL_Tour360} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen />
              </div>
            )}
            {activeTab === 'plano' && property.URL_Plano && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <img src={property.URL_Plano} alt="Plano" style={{ maxHeight: '500px', objectFit: 'contain', borderRadius: '0.875rem', cursor: 'pointer', border: '1px solid var(--card-border)' }} onClick={() => setLightboxIndex(999)} />
              </div>
            )}
          </div>
        </div>

        {/* DOS COLUMNAS: DETALLES + SIDEBAR */}
        <div style={{ ...containerStyle }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* DETALLES */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* STATS RÁPIDOS */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '1.75rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', textAlign: 'center' }} className="sm:grid-cols-4">
                {[
                  { label: 'Superficie Cubierta', val: property.Sup_Cubierta ? `${property.Sup_Cubierta} m²` : '-' },
                  { label: 'Ambientes',           val: property.Ambientes   ? `${property.Ambientes} amb`   : '-' },
                  { label: 'Dormitorios',         val: property.Dormitorios ? `${property.Dormitorios} dorm` : '-' },
                  { label: 'Baños',               val: property.Banos       ? `${property.Banos} baños`     : '-' },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>{s.label}</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-strong)', marginTop: '6px' }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* FICHA TÉCNICA */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#660033', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--divider)' }}>
                  Ficha Técnica
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ['Sup. Total', property.Sup_Total ? `${property.Sup_Total} m²` : null],
                    ['Cochera', property.Cocheras === '0' ? 'No tiene' : property.Cocheras || null],
                    ['Antigüedad', property.Antiguedad ? `${property.Antiguedad} años` : null],
                    ['Orientación', property.Orientacion || null],
                    ['Disposición', property.Disposicion || null],
                    ['Apto Profesional', property.Apto_Profesional || null],
                  ].filter(([, v]) => v).map(([label, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--divider)' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-strong)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESCRIPCIÓN */}
              {property.Descripcion && (
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#660033', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--divider)' }}>
                    Descripción
                  </h3>
                  <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', textAlign: 'justify' }}>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                      {property.Descripcion}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* MAPA */}
              {property.Direccion_maps && (
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#660033', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--divider)' }}>
                    Ubicación aproximada
                  </h3>
                  <div style={{ borderRadius: '0.875rem', overflow: 'hidden', height: '360px', border: '1px solid var(--card-border)' }}>
                    <iframe src={property.Direccion_maps} width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" />
                  </div>
                </div>
              )}

            </div>

            {/* SIDEBAR STICKY */}
            <div style={{ position: 'sticky', top: '100px', alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Contactá con el asesor
                </p>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: '0.5rem' }}>
                  ¿Querés visitar esta propiedad?
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Dejanos tu información y coordinamos una visita.
                </p>
                <a href="#contacto-directo" style={{
                  display: 'block', textAlign: 'center', background: '#660033', color: '#fff',
                  padding: '1rem', borderRadius: '0.75rem', fontWeight: 900, textTransform: 'uppercase',
                  fontSize: '11px', letterSpacing: '0.12em', textDecoration: 'none', transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Agendar Visita
                </a>
              </div>

              {/* Precio en sidebar */}
              <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Precio</p>
                <p style={{ fontSize: '1.625rem', fontWeight: 900, color: '#660033' }}>
                  {property.Moneda} {Number(property.Precio).toLocaleString('es-AR')}
                </p>
                {property.Expensas && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
                    + ${Number(property.Expensas).toLocaleString('es-AR')} expensas
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* FORMULARIO */}
        <div id="contacto-directo" style={{ ...containerStyle, marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--divider)' }}>
          <ContactoJoin brand={data.brand} defaultTema="Me interesa una propiedad" propiedadInfo={propiedadInfo} />
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)' }}>
          <button onClick={() => setLightboxIndex(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <X size={24} />
          </button>
          {lightboxIndex !== 999 && photos.length > 1 && (
            <button onClick={prevPhoto} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', padding: '1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
              <ChevronLeft size={32} />
            </button>
          )}
          <div style={{ maxWidth: '1000px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={lightboxIndex === 999 ? property.URL_Plano : photos[lightboxIndex]} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '0.5rem' }} alt="" />
            {lightboxIndex !== 999 && (
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '1rem' }}>
                Foto {lightboxIndex + 1} de {photos.length}
              </p>
            )}
          </div>
          {lightboxIndex !== 999 && photos.length > 1 && (
            <button onClick={nextPhoto} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', padding: '1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}

    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await getAllSiteData();
    const property = (data.propiedades || []).find(p => p.Slug === params.slug);
    if (!property) return { notFound: true };
    return { props: { property, data } };
  } catch (e) {
    console.error("Error at getServerSideProps of property detail:", e);
    return { notFound: true };
  }
}
