import { getAllSiteData } from '../../lib/google-sheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { dni, password } = req.body;
  console.log("Recibido DNI:", dni, "Pass:", password);

  try {
    const data = await getAllSiteData();
    
    // 1. Buscamos usuario (comparamos como string para evitar errores con números de DNI)
    const user = data.usuarios.find(
      (u) => String(u.dni).trim() === String(dni).trim() && 
             String(u.psw).trim() === String(password).trim()
    );

    if (!user) {
      return res.status(401).json({ message: "DNI o Password incorrectos" });
    }

    // 2. Buscamos el consorcio al que pertenece el usuario
    const consorcio = data.consorcios.find(c => c.id_consorcio === user.id_consorcio);

    // 3. Respondemos con toda la info necesaria
   // Dentro de tu api/login.js, cuando retornas el JSON (status 200):
return res.status(200).json({
    nombre: user.nombre_apellido,
    id_consorcio: user.id_consorcio,
    unidad: user.unidad_funcional,
    edificio: consorcio?.nombre_edificio || "Consorcio",
    direccion: consorcio?.direccion || "",
    // Usamos el nombre limpio de la columna del sheet:
    reglamento: consorcio?.reglamento_pdf || null, 
    manual: consorcio?.manual_propietario || null
});

  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor de datos" });
  }
}
