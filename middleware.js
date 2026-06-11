/**
 * @fileoverview Middleware de diagnóstico mínimo para aislamiento de errores.
 */
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Pasaje directo absoluto sin lecturas de red ni lógica
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)',
  ],
};