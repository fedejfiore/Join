"use client";
// Mapa interactivo con Leaflet cargado desde CDN (sin npm install)
import { useEffect, useRef } from 'react';

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS  = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

export default function MapaListado({ propiedades = [] }) {
  const mapRef    = useRef(null);
  const instanceRef = useRef(null);

  const norm = v => parseFloat((v || '').toString().trim().replace(',', '.'));

  const withCoords = propiedades.filter(p => {
    const lat = norm(p.LAT);
    const lng = norm(p.LONG);
    return !isNaN(lat) && !isNaN(lng);
  });

  useEffect(() => {
    // Inyectar CSS de Leaflet si no está ya
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    // Cargar JS de Leaflet si no está ya
    const initMap = () => {
      const L = window.L;
      if (!L || !mapRef.current) return;
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }

      const center = withCoords.length > 0
        ? [norm(withCoords[0].LAT), norm(withCoords[0].LONG)]
        : [-34.6132, -58.3772];

      const map = L.map(mapRef.current, {
        center,
        zoom: withCoords.length === 1 ? 15 : 13,
        scrollWheelZoom: false,
      });
      instanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Icono personalizado JOIN
      const iconBase = L.icon({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
      });

      withCoords.forEach(prop => {
        const lat = norm(prop.LAT);
        const lng = norm(prop.LONG);
        const precio = Number(prop.Precio).toLocaleString('es-AR');
        const popup = `
          <div style="min-width:160px;font-family:inherit">
            <p style="font-weight:700;font-size:13px;margin:0 0 4px;color:#111">${prop.Titulo || ''}</p>
            <p style="font-size:11px;color:#555;margin:0 0 4px">${prop.Tipo || ''} · ${prop.Barrio || ''}</p>
            <p style="font-size:13px;font-weight:900;color:#660033;margin:0 0 8px">${prop.Moneda || ''} ${precio}</p>
            <a href="/propiedades/${prop.Slug}"
               style="display:block;text-align:center;background:#660033;color:#fff;padding:6px 12px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
              Ver propiedad →
            </a>
          </div>`;
        L.marker([lat, lng], { icon: iconBase }).addTo(map).bindPopup(popup);
      });

      if (withCoords.length > 1) {
        const bounds = L.latLngBounds(withCoords.map(p => [norm(p.LAT), norm(p.LONG)]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    };

    if (window.L) {
      initMap();
    } else if (!document.querySelector('#leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = LEAFLET_JS;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      // Script ya insertado, esperar a que cargue
      document.querySelector('#leaflet-js').addEventListener('load', initMap);
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [withCoords]);

  if (withCoords.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)', color: 'var(--text-muted)', gap: '0.5rem' }}>
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <p style={{ fontSize: '13px', fontWeight: 600 }}>Sin coordenadas disponibles</p>
        <p style={{ fontSize: '11px', color: 'var(--text-faint)' }}>Agregá LAT y LONG en el sheet</p>
      </div>
    );
  }

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}
