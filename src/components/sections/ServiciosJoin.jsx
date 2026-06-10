"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importación de estilos base de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ServiciosJoin({ servicios = [] }) {
  const [mounted, setMounted] = useState(false);

  // Evita errores de renderizado en el servidor (SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !servicios || servicios.length === 0) return null;

  return (
    <section id="servicios" className="section-dynamic overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 text-center">
          Servicios Jurídicos e Inmobiliarios Integrados
        </h2>
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2} 
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={servicios.length > 3}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full py-12"
          >
            {servicios.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
                  <img src={s.Imagen_Fondo || s.imagen} className="absolute inset-0 w-full h-full object-cover" />
                  
                  <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-[2]" />
                  
                  <div className="absolute bottom-0 left-0 p-8 text-white z-[10] w-full text-left">
                    <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tighter text-on-image">
                      {s.Titulo}
                    </h3>
                    <p className="text-sm font-medium opacity-90 leading-relaxed text-white">
                      {s.Detalle || s.Descripcion}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* BOTONES DE NAVEGACIÓN */}
          <button className="swiper-button-prev-custom absolute top-1/2 -left-2 md:-left-12 z-30 bg-white dark:bg-slate-800 p-4 rounded-full shadow-xl text-primary dark:text-accent hover:scale-110 transition-all border border-slate-100 dark:border-slate-700 hidden sm:flex">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button className="swiper-button-next-custom absolute top-1/2 -right-2 md:-right-12 z-30 bg-white dark:bg-slate-800 p-4 rounded-full shadow-xl text-primary dark:text-accent hover:scale-110 transition-all border border-slate-100 dark:border-slate-700 hidden sm:flex">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
