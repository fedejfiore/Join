import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. WHITELIST — pasar sin procesar
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

  // 2. Ignorar pre-fetches y UTMs (evita doble conteo)
  if (
    request.headers.get('x-middleware-preflight') === '1' ||
    request.headers.get('purpose') === 'prefetch' ||
    searchParams.has('utm_source')
  ) {
    return NextResponse.next();
  }

  try {
    const SHEET_PUB_ID = '2PACX-1vRZuKDtaB1ZFqMScvYY_skOimJ2p2cUwKwMf2WGnJOrDbVtgMy4Yndefext0tbhVpGQM7mBo_7FClca';
    const GID_REDIRECCIONES = '563740450';

    const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${GID_REDIRECCIONES}&single=true&output=csv&cb=${Date.now()}`;

    const res = await fetch(url);
    const csvText = await res.text();

    const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== '').map(row => row.split(','));
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(row =>
      headers.reduce((acc, header, i) => ({ ...acc, [header]: row[i]?.trim() }), {})
    );

    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

    const found = data.find(r => {
      const origen = r.Origen_corto || r['Origen corto'] || Object.values(r)[0];
      const excelOrigin = origen?.startsWith('/') ? origen : `/${origen}`;
      return excelOrigin === cleanPath && (r.ON_OFF === 'ON');
    });

    if (!found) return NextResponse.next();

    const destinoRaw = (found.Sección_o_Nota || found.Seccion_o_Nota || Object.values(found)[1])?.trim();
    const campaña   = (found.Nombre_Campaña || found.Nombre_Campana  || Object.values(found)[2] || 'qr_general')?.trim();

    if (!destinoRaw) return NextResponse.next();

    // URL del script — configurable via variable de entorno en Vercel
    // Vercel dashboard → Settings → Environment Variables → APPS_SCRIPT_URL
    const SCRIPT_URL = process.env.APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbwwzPiGPb8BtYt0r8tQR1rld6krDZDkvg4p2volKzRAed-RQUhOEF4chjelUlnxgD2h/exec';

    const scriptParams = new URLSearchParams({
      id:   found.Origen_corto || cleanPath,
      dest: destinoRaw,
      camp: campaña,
      ua:   request.headers.get('user-agent') || 'Unknown',
    });
    const fullScriptUrl = `${SCRIPT_URL}?${scriptParams.toString()}`;

    const isExternal = destinoRaw.toLowerCase().startsWith('http');

    // Llamada al script con timeout generoso (Google Apps Script cold start: 1-3s)
    try {
      await Promise.race([
        fetch(fullScriptUrl),
        new Promise((_, reject) => setTimeout(() => reject(new Error('script_timeout')), 4000)),
      ]);
    } catch (scriptErr) {
      // No bloqueamos el redirect si el script falla o tarda demasiado
      console.warn('JOIN MKT script:', scriptErr.message, '| url:', fullScriptUrl);
    }

    // Redirigir con parámetros UTM
    if (isExternal) {
      try {
        const dest = new URL(destinoRaw);
        dest.searchParams.set('utm_source', 'qr_join');
        dest.searchParams.set('utm_medium', 'offline');
        dest.searchParams.set('utm_campaign', campaña);
        return NextResponse.redirect(dest.toString(), 307);
      } catch {
        return NextResponse.redirect(
          `${destinoRaw}${destinoRaw.includes('?') ? '&' : '?'}utm_source=qr_join&utm_campaign=${campaña}`,
          307
        );
      }
    } else {
      const [path, hash] = destinoRaw.split('#');
      const basePath = (path || '/').startsWith('/') ? (path || '/') : `/${path || '/'}`;
      const finalUrl = `${basePath}?utm_source=qr_join&utm_medium=offline&utm_campaign=${campaña}${hash ? '#' + hash : ''}`;
      return NextResponse.redirect(new URL(finalUrl, request.url), 307);
    }

  } catch (e) {
    console.error('JOIN Middleware Error:', e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)'],
};
