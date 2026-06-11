/**
 * @fileoverview Middleware defensivo con tiempo de corte (Timeout) estricto para Edge.
 * @author Desarrollo Web y Autom
 */

import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. WHITELIST INMEDIATA: Evita procesar rutas operativas del framework
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.') || 
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  try {
    const SHEET_PUB_ID = '2PACX-1vRZuKDtaB1ZFqMScvYY_skOimJ2p2cUwKwMf2WGnJOrDbVtgMy4Yndefext0tbhVpGQM7mBo_7FClca';
    const GID_REDIRECCIONES = '563740450'; 
    
    // SOLUCCIÓN CRÍTICA: Controlador de aborto por hardware para evitar que Vercel mate el hilo
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500); // 500ms máximo o se corta

    const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${GID_REDIRECCIONES}&single=true&output=csv`;
    
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Limpiamos el timer si respondió a tiempo

    if (!res.ok) return NextResponse.next();
    
    const csvText = await res.text();
    
    // Si Google devuelve un HTML de error en vez de un CSV, salimos elegantemente
    if (!csvText || csvText.includes('<!DOCTYPE html>')) {
      return NextResponse.next();
    }

    const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== "").map(row => row.split(','));
    if (!rows || rows.length < 2) return NextResponse.next();
    
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(row => headers.reduce((acc, header, i) => ({ ...acc, [header]: row[i]?.trim() }), {}));
    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

    const found = data.find(r => {
      const origen = r.Origen_corto || r["Origen corto"] || Object.values(r)[0];
      const excelOrigin = origen?.startsWith('/') ? origen : `/${origen}`;
      return excelOrigin === cleanPath && (r.ON_OFF === 'ON' || r["ON_OFF"] === 'ON');
    });

    if (found) {
      const destinoRaw = (found.Sección_o_Nota || found.Seccion_o_Nota || Object.values(found)[1])?.trim();
      if (destinoRaw) {
        return NextResponse.redirect(new URL(destinoRaw, request.url), 307);
      }
    }

  } catch (e) {
    // Si hay timeout, error de red o de parseo, el middleware no bloquea al usuario
    console.error("Middleware safe fallback:", e.message);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)',
  ],
};