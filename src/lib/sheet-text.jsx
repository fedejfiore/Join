// Renders text from Google Sheets with support for:
//   **negrita**  →  bold
//   *cursiva*    →  italic
//   Alt+Enter    →  line break
//
// Usage: <SheetText text={value} />
//        <SheetText text={value} as="p" style={{ color: 'red' }} />

export default function SheetText({ text, as: Tag = 'span', style, className }) {
  if (!text) return null;
  const html = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/gs, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
  return <Tag dangerouslySetInnerHTML={{ __html: html }} style={style} className={className} />;
}
