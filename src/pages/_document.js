import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        {/* Google Tag Manager (noscript) - Plan B por si el usuario no tiene JS */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WV96F65J"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}