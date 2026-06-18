import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,900;1,900&display=swap" rel="stylesheet" />
      </Head>
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