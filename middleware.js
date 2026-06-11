/**
 * @fileoverview Middleware de redirecciones dinámicas optimizado para Edge Runtime.
 * @author Desarrollo Web y Autom
 */

import { NextResponse } from 'next/server';

export async function middleware(request, event) { // <--- Agregamos 'event' para tareas en segundo plano
  const { pathname, searchParams } = request.nextUrl;

  // 1. WHITELIST ABSOLUTA: Si la ruta es una de estas, SE DEJA PASAR DE INMEDIATO
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.') || 
    pathname === '/' ||
    pathname === '/manifest.json' ||
    pathname === '/sw.js'
  ) {
    return NextResponse.next();
  }

  // 2. Filtro de Pre-fetch y UTMs básicos
  if (
    request.headers.get('x-middleware-preflight') === '1' || 
    request.headers.get('purpose') === 'prefetch' ||
    searchParams.has('utm_source')
  ) {
    return NextResponse.next();
  }

  try {
    // CORRECCIÓN 1: ID de la nueva base de datos de JOIN
    const SHEET_PUB_ID = '2PACX-1vRZuKDtaB1ZFqMScvYY_skOimJ2p2cUwKwMf2WGnJOrDbVtgMy4Yndefext0tbhVpGQM7mBo_7FClca';
    const GID_REDIRECCIONES = '563740450'; 
    
    // CORRECCIÓN 2: Ventana de caché inteligente de 5 minutos (300.000 ms)
    // Evita colgar el Middleware por demoras de procesamiento en los servidores de Google.
    const cacheWindow = Math.floor(Date.now() / 300000);
    const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${GID_REDIRECCIONES}&single=true&output=csv&cb=${cacheWindow}`;
    
    const res = await fetch(url);
    if (!res.ok) return NextResponse.next(); // Salvaguarda si el servicio de Google Sheets llega a caer
    
    const csvText = await res.text();
    const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== "").map(row => row.split(','));
    
    if (!rows || rows.length === 0) return NextResponse.next();
    
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(row => headers.reduce((acc, header, i) => ({ ...acc, [header]: row[i]?.trim() }), {}));

    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

    const found = data.find(r => {
      const origen = r.Origen_corto || r["Origen corto"] || Object.values(r)[0];
      const excelOrigin = origen?.startsWith('/') ? origen : `/${origen}`;
      return excelOrigin === cleanPath && (r.ON_OFF === 'ON' || r["ON_OFF"] === 'ON');
    });

    if (found) {
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwivmKGVjylM_KERiwebIcagCzk4Zre429hXWkQvG6xmIK_l47a2FMRsku-0lXayzAT/exec";
      
      const destinoRaw = (found.Sección_o_Nota || found.Seccion_o_Nota || Object.values(found)[1])?.trim();
      const campaña = (found.Nombre_Campaña || found.Nombre_Campana || Object.values(found)[2] || 'qr_general')?.trim();

      if (!destinoRaw) return NextResponse.next();

      const isExternal = destinoRaw.toLowerCase().startsWith('http');
      const fullScriptUrl = `${SCRIPT_URL}?id=${encodeURIComponent(found.Origen_corto)}&dest=${encodeURIComponent(destinoRaw)}&camp=${encodeURIComponent(campaña)}&ua=${encodeURIComponent(request.headers.get('user-agent') || 'Mobile')}`;

      // CORRECCIÓN 3: Uso de event.waitUntil para el tracking asíncrono.
      // Le informa a Vercel que mantenga vivo el canal un instante más sin trabar la respuesta de la UI.
      if (isExternal) {
        event.waitUntil(
          Promise.race([
            fetch(fullScriptUrl),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 800))
          ]).catch(() => {})
        );
      } else {
        event.waitUntil(fetch(fullScriptUrl).catch(() => {}));
      }

      if (isExternal) {
        try {
          const urlObjeto = new URL(destinoRaw);
          urlObjeto.searchParams.set('utm_source', 'qr_join');
          urlObjeto.searchParams.set('utm_medium', 'offline');
          urlObjeto.searchParams.set('utm_campaign', campaña);
          return NextResponse.redirect(urlObjeto.toString(), 307);
        } catch (err) {
          const sep = destinoRaw.includes('?') ? '&' : '?';
          return NextResponse.redirect(new URL(`${destinoRaw}${sep}utm_source=qr_join&utm_campaign=${campaña}`, request.url), 307);
        }
      } else {
        const [path, hash] = destinoRaw.split('#');
        let basePath = path || '/';
        if (!basePath.startsWith('/')) basePath = `/${basePath}`;
        const finalUrl = `${basePath}?utm_source=qr_join&utm_medium=offline&utm_campaign=${campaña}${hash ? '#' + hash : ''}`;
        return NextResponse.redirect(new URL(finalUrl, request.url), 307);
      }
    }
  } catch (e) {
    console.error("Middleware Error:", e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)',
  ],
};