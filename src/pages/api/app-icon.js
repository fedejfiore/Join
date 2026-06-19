import fs from 'fs';
import path from 'path';

// Node.js runtime — puede leer archivos del filesystem
export default function handler(req, res) {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'JOIN-Blanco.png');
    const logoBase64 = fs.readFileSync(logoPath).toString('base64');

    // SVG 512×512: fondo burdeos + logo JOIN-Blanco embeddado como base64
    // No hay fetch externo → siempre funciona
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#660033"/>
  <image
    href="data:image/png;base64,${logoBase64}"
    x="90" y="90" width="332" height="332"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(svg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
