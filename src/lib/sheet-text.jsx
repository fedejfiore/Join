// Renders text from Google Sheets with support for:
//   **negrita**     →  bold
//   *cursiva*       →  italic
//   __subrayado__   →  underline
//   ~~tachado~~     →  strikethrough
//   [texto](url)    →  link (url debe empezar con http://, https:// o /)
//   url pelada       →  también se convierte en link solo con pegarla (http://..., https://... o www...)
//   {color:texto}   →  texto coloreado (nombre en español o código hex, ej. {rojo:texto} o {#cc0044:texto})
//   Alt+Enter       →  line break
//
// Los formatos se pueden combinar, ej: {rojo:**texto en rojo y negrita**}
//
// Usage: <SheetText text={value} />
//        <SheetText text={value} as="p" style={{ color: 'red' }} />

const COLOR_NAMES = {
  rojo: '#dc2626',
  azul: '#2563eb',
  verde: '#16a34a',
  amarillo: '#eab308',
  naranja: '#ea580c',
  violeta: '#7c3aed',
  rosa: '#db2777',
  celeste: '#38bdf8',
  gris: '#6b7280',
  negro: '#111111',
  blanco: '#ffffff',
  dorado: '#b8860b',
  burdeos: '#660033',
};

function resolveColor(key) {
  if (/^#[0-9a-fA-F]{3,8}$/.test(key)) return key;
  return COLOR_NAMES[key.toLowerCase()] || key.toLowerCase();
}

export default function SheetText({ text, as: Tag = 'span', style, className }) {
  if (!text) return null;
  const html = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s")]+|\/[^\s")]*)\)|(https?:\/\/[^\s<]+|www\.[^\s<]+)/gs, (match, label, bracketUrl, bareUrl) => {
      if (bracketUrl) return `<a href="${bracketUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      const trailing = (bareUrl.match(/[.,;:!?)]+$/) || [''])[0];
      const clean = trailing ? bareUrl.slice(0, -trailing.length) : bareUrl;
      const href = clean.startsWith('www.') ? `https://${clean}` : clean;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${clean}</a>${trailing}`;
    })
    .replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/gs, '<em>$1</em>')
    .replace(/__(.+?)__/gs, '<u>$1</u>')
    .replace(/~~(.+?)~~/gs, '<s>$1</s>')
    .replace(/\{(#?[0-9a-zA-Z]+):(.+?)\}/gs, (_, color, content) => `<span style="color:${resolveColor(color)}">${content}</span>`)
    .replace(/\n/g, '<br/>');
  return <Tag dangerouslySetInnerHTML={{ __html: html }} style={style} className={className} />;
}
