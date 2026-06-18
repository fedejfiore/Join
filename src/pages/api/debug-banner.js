import Papa from 'papaparse';

const SHEET_PUB_ID = '2PACX-1vRZuKDtaB1ZFqMScvYY_skOimJ2p2cUwKwMf2WGnJOrDbVtgMy4Yndefext0tbhVpGQM7mBo_7FClca';
const GID_BANNER   = '1166609304';

export default async function handler(req, res) {
  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${GID_BANNER}&single=true&output=csv&cb=${Date.now()}`;
  const response = await fetch(url);
  const csvText  = await response.text();

  const parsed = await new Promise(resolve =>
    Papa.parse(csvText, { header: true, skipEmptyLines: true, complete: r => resolve(r.data) })
  );

  // Muestra filas crudas + el objeto mapeado
  const mapped = parsed.reduce((acc, row) => {
    if (row.Clave) acc[row.Clave] = { valor: row.Valor, status: row.ON_OFF, _rawKeys: Object.keys(row) };
    return acc;
  }, {});

  res.status(200).json({ raw_rows: parsed.slice(0, 10), mapped });
}
