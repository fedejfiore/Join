import Papa from 'papaparse';

const SHEET_PUB_ID = '2PACX-1vRZuKDtaB1ZFqMScvYY_skOimJ2p2cUwKwMf2WGnJOrDbVtgMy4Yndefext0tbhVpGQM7mBo_7FClca';

const GIDS = {
  // ── EXISTENTES ─────────────────────────────────────────────
  brand:               '0',
  servicios:           '393025134',
  proceso:             '2127048593',
  banner:              '1166609304',
  nosotros:            '1360191972',
  valores:             '100701716',   // repuesto con nueva estructura por el script
  FAQ:                 '1028538141',
  noticias:            '708572124',
  MKT_Redirecciones:   '563740450',
  SETUP:               '1368475897',
  config_accesibilidad:'138221169',
  SETUP_mkt:           '2077502373',
  formulario:          '1781109751',
  propiedades:         '1902783513',
  contacto:            '1909991166',

  // ── NUEVAS ──────────────────────────────────────────────────
  sucesiones:          '887481242',
  sucesiones_porque:   '305090467',
  sucesiones_proceso:  '411254445',
  sucesiones_docs:     '330465004',
  sucesiones_faq:      '2095173442',
  tasaciones:          '1014940336',
  tasaciones_docs:     '472687207',
  tasaciones_propuesta:'1202515012',
  tasaciones_faq:      '1788356313',
  juridico:            '329809726',
  juridico_areas:      '315993655',
  valores_items:       '695950307',
};

// Convierte un link de "compartir" de Google Drive (view/open/id=) en una URL
// de imagen directa, servible desde <img src="...">. Si no es un link de
// Drive, lo devuelve sin tocar.
export function toDirectImageUrl(url) {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
  const id = match ? match[1] : null;
  return id ? `https://lh3.googleusercontent.com/d/${id}` : url;
}

const FETCH_TIMEOUT_MS = 10_000;

async function fetchCSV(gid) {
  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${gid}&single=true&output=csv`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url + '&cb=' + Date.now(), { signal: controller.signal });
    const csvText = await response.text();
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
      });
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchCSVSafe(gid) {
  if (!gid) return [];
  try {
    return await fetchCSV(gid);
  } catch {
    return [];
  }
}

const mapConfig = (arr) => {
  if (!arr || !arr.length) return {};
  return arr.reduce((acc, curr) => {
    if (curr.Clave) {
      acc[curr.Clave] = { valor: curr.Valor || '', status: curr.ON_OFF || 'ON' };
    }
    return acc;
  }, {});
};

// Pestañas con GID conocido (siempre se buscan)
const FIXED_KEYS = [
  'brand','servicios','proceso','banner','nosotros','valores',
  'FAQ','noticias','MKT_Redirecciones','SETUP','config_accesibilidad',
  'SETUP_mkt','formulario','propiedades','contacto',
];

// Pestañas nuevas (solo si tienen GID cargado)
const DYNAMIC_KEYS = [
  'sucesiones','sucesiones_porque','sucesiones_proceso','sucesiones_docs','sucesiones_faq',
  'tasaciones','tasaciones_docs','tasaciones_propuesta','tasaciones_faq',
  'juridico','juridico_areas','valores_items',
];

async function fetchAllRaw() {
  const [fixedResults, dynamicResults] = await Promise.all([
    Promise.all(FIXED_KEYS.map(k => fetchCSV(GIDS[k]))),
    Promise.all(DYNAMIC_KEYS.map(k => fetchCSVSafe(GIDS[k]))),
  ]);

  const raw = {};
  FIXED_KEYS.forEach((k, i) => { raw[k] = fixedResults[i]; });
  DYNAMIC_KEYS.forEach((k, i) => { raw[k] = dynamicResults[i]; });
  return raw;
}

function buildSiteData(raw) {
  const ON = (arr) => (arr || []).filter(r => r.ON_OFF === 'ON');

  return {
    // Config maps
    setup:                mapConfig(raw.SETUP),
    brand:                mapConfig(raw.brand),
    banner:               mapConfig(raw.banner),
    nosotros:             mapConfig(raw.nosotros),
    config_accesibilidad: mapConfig(raw.config_accesibilidad),
    mkt:                  mapConfig(raw.SETUP_mkt),

    // Páginas (config Clave/Valor)
    sucesiones_cfg:   mapConfig(raw.sucesiones),
    tasaciones_cfg:   mapConfig(raw.tasaciones),
    juridico_cfg:     mapConfig(raw.juridico),

    // Listas estáticas
    servicios:           ON(raw.servicios),
    valores:             ON(raw.valores),
    valores_items:       ON(raw.valores_items),
    faq:                 ON(raw.FAQ),
    noticias:            ON(raw.noticias),
    propiedades:         ON(raw.propiedades),
    redirecciones:       ON(raw.MKT_Redirecciones),

    // Listas de páginas interiores
    sucesiones_porque:    ON(raw.sucesiones_porque),
    sucesiones_proceso:   ON(raw.sucesiones_proceso),
    sucesiones_docs:      ON(raw.sucesiones_docs),
    sucesiones_faq:       ON(raw.sucesiones_faq),
    tasaciones_docs:      ON(raw.tasaciones_docs),
    tasaciones_propuesta: ON(raw.tasaciones_propuesta),
    tasaciones_faq:       ON(raw.tasaciones_faq),
    juridico_areas:       ON(raw.juridico_areas),
  };
}

// Caché en memoria del servidor: si hay una copia de menos de CACHE_TTL_MS,
// se sirve directo sin volver a consultar el Sheet. Si está vieja (o no hay
// ninguna) se intenta actualizar, pero si el Sheet falla o tarda de más se
// sigue mostrando la última copia buena en vez de colgar la página.
const CACHE_TTL_MS = 60_000;
let cache = null; // { data, timestamp }

export async function getAllSiteData() {
  const now = Date.now();
  if (cache && (now - cache.timestamp) < CACHE_TTL_MS) {
    return cache.data;
  }

  try {
    const raw = await fetchAllRaw();
    const data = buildSiteData(raw);
    cache = { data, timestamp: now };
    return data;
  } catch (e) {
    if (cache) {
      console.error('getAllSiteData: fallo el fetch al Sheet, sirviendo la última copia buena:', e.message);
      return cache.data;
    }
    throw e;
  }
}
