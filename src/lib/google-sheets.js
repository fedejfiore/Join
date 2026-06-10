import Papa from 'papaparse';

const SHEET_PUB_ID = '2PACX-1vSa70-en_DydT5om9rcNvlszYkqkwEEnHLWpFVxclUYw7veSacLywMwkJ9EitNZKYhlJFAK7YifJiva';

const GIDS = {
  brand: '0',
  servicios: '393025134',
  proceso: '2127048593',
  banner: '1166609304',
  nosotros: '1360191972',
  valores: '100701716',
  FAQ: '1028538141',
  noticias: '708572124',
  MKT_Redirecciones: '563740450',
  SETUP: '1368475897',
  config_accesibilidad: '138221169',
  SETUP_mkt: '2077502373',
  formulario: '1781109751',
  propiedades: '1902783513',
  contacto: '1909991166'
};

async function fetchCSV(gid) {
  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?gid=${gid}&single=true&output=csv`;
  const response = await fetch(url + "&cb=" + Date.now());
  const csvText = await response.text();
  
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data)
    });
  });
}

export async function getAllSiteData() {
  const keys = Object.keys(GIDS);
  const responses = await Promise.all(keys.map(k => fetchCSV(GIDS[k])));
  
  const rawData = keys.reduce((acc, key, i) => {
    acc[key] = responses[i];
    return acc;
  }, {});

  const mapConfig = (arr) => {
    if (!arr) return {};
    return arr.reduce((acc, curr) => {
      if (curr.Clave) {
        acc[curr.Clave] = { 
          valor: curr.Valor || "", 
          status: curr.ON_OFF || "ON"
        };
      }
      return acc;
    }, {});
  };

  return {
    setup:                mapConfig(rawData.SETUP),
    brand:                mapConfig(rawData.brand),
    banner:               mapConfig(rawData.banner),
    nosotros:             mapConfig(rawData.nosotros),
    config_accesibilidad: mapConfig(rawData.config_accesibilidad),
    mkt:                  mapConfig(rawData.SETUP_mkt),
    // LISTAS
    servicios:    rawData.servicios?.filter(s => s.ON_OFF === 'ON') || [],
    valores:      rawData.valores?.filter(v => v.ON_OFF === 'ON') || [],
    faq:          rawData.FAQ?.filter(f => f.ON_OFF === 'ON') || [],
    noticias:     rawData.noticias?.filter(n => n.ON_OFF === 'ON') || [],
    propiedades:  rawData.propiedades?.filter(p => p.ON_OFF === 'ON') || [],
    redirecciones: rawData.MKT_Redirecciones?.filter(r => r.ON_OFF === 'ON') || [],
  };
}