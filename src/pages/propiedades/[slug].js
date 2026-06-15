"use client";

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import Layout from '../../components/layout/Layout';
import ContactoJoin from '../../components/sections/ContactoJoin';
import { getAllSiteData } from '../../lib/google-sheets';
import { ChevronLeft, ChevronRight, X, Grid, Film, Compass, MapPin } from 'lucide-react';

export default function PropertyDetail({ property, data }) {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState('fotos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Recolectar fotos no vacías
  const photos = [
    property.Foto_1, property.Foto_2, property.Foto_3, property.Foto_4, property.Foto_5,
    property.Foto_6, property.Foto_7, property.Foto_8, property.Foto_9, property.Foto_10
  ].filter(Boolean);

  // Helper para convertir urls de Youtube
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const videoEmbed = getEmbedUrl(property.URL_Video);

  // Navegar en Lightbox
  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const propiedadInfo = `${property.Titulo} (${property.Direccion || property.Barrio})`;

  return (
    <Layout data={data}>
      <div className="min-h-screen pt-32 pb-24">
        
        {/* HEADER Y BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Link 
            href="/propiedades" 
            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-400 hover:text-primary dark:hover:text-accent transition-colors mb-6"
          >
            <ChevronLeft size={16} /> Volver a Propiedades
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-primary text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">
                  {property.Operacion}
                </span>
                {property.Destacada === 'SI' && (
                  <span className="bg-amber-400 text-slate-900 text-[9px] font-black uppercase px-3 py-1 rounded-full">
                    ★ Destacada
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-accent mt-4 leading-none">
                {property.Titulo}
              </h1>
              <p className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400 mt-2">
                <MapPin size={16} /> {property.Direccion ? `${property.Direccion}, ` : ''}{property.Barrio}
              </p>
            </div>
            <div className="text-left lg:text-right shrink-0">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Valor de publicación</p>
              <p className="text-4xl md:text-5xl font-black text-primary dark:text-accent mt-1 transition-colors">
                {property.Moneda} {Number(property.Precio).toLocaleString('es-AR')}
              </p>
              {property.Expensas && (
                <p className="text-xs text-slate-400 font-bold mt-1">
                  + ${Number(property.Expensas).toLocaleString('es-AR')} expensas
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CONTENEDOR MULTIMEDIA CON PESTAÑAS */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          {/* Pestañas Selectoras */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <button 
              onClick={() => setActiveTab('fotos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'fotos'
                  ? 'bg-primary text-white dark:bg-accent dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              <Grid size={16} /> Fotos ({photos.length})
            </button>
            {videoEmbed && (
              <button 
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'video'
                    ? 'bg-primary text-white dark:bg-accent dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                <Film size={16} /> Video Tour
              </button>
            )}
            {property.URL_Tour360 && (
              <button 
                onClick={() => setActiveTab('tour')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'tour'
                    ? 'bg-primary text-white dark:bg-accent dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                <Compass size={16} /> Tour 360°
              </button>
            )}
            {property.URL_Plano && (
              <button 
                onClick={() => setActiveTab('plano')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'plano'
                    ? 'bg-primary text-white dark:bg-accent dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                📐 Plano
              </button>
            )}
          </div>

          {/* Renderizado de multimedia según pestaña activa */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 md:p-6 border border-slate-100 dark:border-slate-800 shadow-md min-h-[400px]">
            {activeTab === 'fotos' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((url, i) => (
                  <div 
                    key={i} 
                    onClick={() => setLightboxIndex(i)}
                    className="relative cursor-pointer aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all"
                  >
                    <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'video' && videoEmbed && (
              <div className="aspect-video w-full rounded-[2rem] overflow-hidden">
                <iframe 
                  src={videoEmbed} 
                  className="w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </div>
            )}

            {activeTab === 'tour' && property.URL_Tour360 && (
              <div className="w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden">
                <iframe 
                  src={property.URL_Tour360} 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                />
              </div>
            )}

            {activeTab === 'plano' && property.URL_Plano && (
              <div className="max-w-3xl mx-auto flex justify-center p-4">
                <img 
                  src={property.URL_Plano} 
                  alt="Plano de la propiedad" 
                  onClick={() => setLightboxIndex(999)} // Abre plano en Lightbox
                  className="max-h-[500px] object-contain rounded-2xl cursor-pointer hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-800" 
                />
              </div>
            )}
          </div>
        </div>

        {/* DOS COLUMNAS: DETALLES Y FORMULARIO */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* DETALLES DE LA PROPIEDAD */}
          <div className="lg:col-span-2 space-y-10">
            {/* Características rápidas en cuadrícula */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Superficie Cubierta</p>
                <p className="text-xl font-black text-slate-800 dark:text-white mt-1">{property.Sup_Cubierta || '-'} m²</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ambientes</p>
                <p className="text-xl font-black text-slate-800 dark:text-white mt-1">{property.Ambientes || '-'} amb</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Dormitorios</p>
                <p className="text-xl font-black text-slate-800 dark:text-white mt-1">{property.Dormitorios || '-'} dorm</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Baños</p>
                <p className="text-xl font-black text-slate-800 dark:text-white mt-1">{property.Banos || '-'} baños</p>
              </div>
            </div>

            {/* Ficha técnica detallada */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-black uppercase tracking-wider text-slate-800 dark:text-accent border-b pb-4 border-slate-100 dark:border-slate-800">Ficha Técnica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                {property.Sup_Total && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Sup. Total</span><span className="text-slate-800 dark:text-white">{property.Sup_Total} m²</span></div>}
                {property.Cocheras && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Cochera</span><span className="text-slate-800 dark:text-white">{property.Cocheras === '0' ? 'No tiene' : `${property.Cocheras}`}</span></div>}
                {property.Antiguedad && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Antigüedad</span><span className="text-slate-800 dark:text-white">{property.Antiguedad} años</span></div>}
                {property.Orientacion && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Orientación</span><span className="text-slate-800 dark:text-white">{property.Orientacion}</span></div>}
                {property.Disposicion && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Disposición</span><span className="text-slate-800 dark:text-white">{property.Disposicion}</span></div>}
                {property.Apto_Profesional && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span className="text-slate-400">Apto Profesional</span><span className="text-slate-800 dark:text-white">{property.Apto_Profesional}</span></div>}
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-black uppercase tracking-wider text-slate-800 dark:text-accent border-b pb-4 border-slate-100 dark:border-slate-800">Descripción</h3>
              <div className="text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none leading-relaxed text-justify text-base">
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {property.Descripcion || ""}
                </ReactMarkdown>
              </div>
            </div>

            {/* Ubicación (Mapa) */}
            {property.Direccion_maps && (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-xl font-black uppercase tracking-wider text-slate-800 dark:text-accent border-b pb-4 border-slate-100 dark:border-slate-800">Ubicación aproximada</h3>
                <div className="rounded-2xl overflow-hidden h-96 border border-slate-200 dark:border-slate-800 bg-slate-100">
                  <iframe 
                    src={property.Direccion_maps} 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                  </iframe>
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA LATERAL (Sticky Form) */}
          <div className="lg:sticky lg:top-28 space-y-6 z-30">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg text-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Contactá con el asesor</p>
              <p className="font-bold text-slate-800 dark:text-white text-lg mt-2">¿Querés visitar esta propiedad?</p>
              <p className="text-xs text-slate-500 mt-2 mb-6 font-medium">Dejanos tu información y coordinamos una visita.</p>
              <a 
                href="#contacto-directo"
                className="block w-full text-center bg-primary dark:bg-accent text-white dark:text-slate-900 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-102 transition-all shadow-md"
              >
                Agendar Visita
              </a>
            </div>
          </div>

        </div>

        {/* FORMULARIO DE CONTACTO EN ANCLAJE */}
        <div id="contacto-directo" className="max-w-7xl mx-auto px-6 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
          <ContactoJoin 
            brand={data.brand} 
            defaultTema="Me interesa una propiedad" 
            propiedadInfo={propiedadInfo} 
          />
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          {/* BOTÓN CERRAR */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 bg-black/20 text-white rounded-full hover:rotate-90 transition-all backdrop-blur-sm"
          >
            <X size={24} />
          </button>

          {/* BOTÓN ANTERIOR */}
          {lightboxIndex !== 999 && photos.length > 1 && (
            <button 
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/20 hover:bg-black/45 text-white rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* CONTENEDOR DE IMAGEN */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img 
              src={lightboxIndex === 999 ? property.URL_Plano : photos[lightboxIndex]} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg" 
              alt="" 
            />
            {lightboxIndex !== 999 && (
              <p className="text-white text-xs font-bold uppercase tracking-widest mt-4">
                Foto {lightboxIndex + 1} de {photos.length}
              </p>
            )}
            {lightboxIndex === 999 && (
              <p className="text-white text-xs font-bold uppercase tracking-widest mt-4">Plano</p>
            )}
          </div>

          {/* BOTÓN SIGUIENTE */}
          {lightboxIndex !== 999 && photos.length > 1 && (
            <button 
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/20 hover:bg-black/45 text-white rounded-full transition-all backdrop-blur-sm"
            >
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

    if (!property) {
      return { notFound: true };
    }

    return { props: { property, data } };
  } catch (e) {
    console.error("Error at getServerSideProps of property detail:", e);
    return { notFound: true };
  }
}
