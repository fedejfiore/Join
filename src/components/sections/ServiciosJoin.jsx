"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ServiciosJoin({ servicios = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !servicios || servicios.length === 0) return null;

  return (
    <section id="servicios" className="section-dynamic overflow-hidden">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Servicios Jurídicos e Inmobiliarios Integrados
          </h2>
          <div style={{ width: '4rem', height: '3px', background: '#cc0044', borderRadius: '2px', margin: '1.5rem auto 0' }} />
        </div>

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
            coverflowEffect={{ rotate: 12, stretch: 0, depth: 80, modifier: 1, slideShadows: true }}
            navigation={{ nextEl: '.swiper-next-custom', prevEl: '.swiper-prev-custom' }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full py-12"
          >
            {servicios.map((s, i) => {
              const href = s.URL || s.url || s.Link || s.link || s.Href || s.href || null;
              const isExternal = href && href.startsWith('http');
              return (
                <SwiperSlide key={i}>
                  <a
                    href={href || undefined}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    style={{ display: 'block', textDecoration: 'none', cursor: href ? 'pointer' : 'default' }}
                  >
                    <div className="relative h-[420px] rounded-xl overflow-hidden shadow-2xl group"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={s.Imagen_Fondo || s.imagen} className="absolute inset-0 w-full h-full object-cover" alt={s.Titulo} />
                      <div className="absolute inset-0 bg-black/40 z-[1]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-[2]" />
                      <div className="absolute bottom-0 left-0 text-white z-[10] w-full text-center"
                        style={{ padding: '2.5rem 2rem 2rem' }}>
                        <h3 className="font-bold mb-3" style={{ fontSize: '1.2rem', lineHeight: 1.3, color: '#ffffff' }}>{s.Titulo}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '280px', margin: '0 auto' }}>
                          {s.Detalle || s.Descripcion}
                        </p>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button className="swiper-prev-custom absolute top-1/2 -left-2 md:-left-12 z-30 p-3 rounded-full shadow-xl transition-all hidden sm:flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="swiper-next-custom absolute top-1/2 -right-2 md:-right-12 z-30 p-3 rounded-full shadow-xl transition-all hidden sm:flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
