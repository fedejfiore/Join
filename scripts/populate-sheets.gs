/**
 * JOIN - Script de Población de Google Sheets
 *
 * INSTRUCCIONES:
 * 1. Abrir el Google Sheet del proyecto
 * 2. Extensions > Apps Script
 * 3. Pegar este script completo y hacer clic en "Guardar"
 * 4. Ejecutar la función crearYPoblarPestañas()
 * 5. Al finalizar, ir a Ver > Registros (Logs) y copiar los GIDs
 * 6. Actualizar los GIDs en src/lib/google-sheets.js
 * 7. Publicar el sheet (Archivo > Compartir > Publicar en la web) para cada nueva pestaña
 */

function crearYPoblarPestañas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  function getOrCreate(nombre) {
    let s = ss.getSheetByName(nombre);
    if (!s) s = ss.insertSheet(nombre);
    else s.clear();
    return s;
  }

  function poblar(nombre, filas) {
    const s = getOrCreate(nombre);
    if (filas.length === 0) return s;
    s.getRange(1, 1, filas.length, filas[0].length).setValues(filas);
    s.setFrozenRows(1);
    // Formato de encabezado
    s.getRange(1, 1, 1, filas[0].length)
      .setBackground('#660033')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    s.autoResizeColumns(1, filas[0].length);
    return s;
  }

  // ============================================================
  // BANNER — agregar filas de paralax si no existen
  // ============================================================
  const bannerSheet = ss.getSheetByName('banner');
  if (bannerSheet) {
    const existingKeys = bannerSheet.getDataRange().getValues().slice(1).map(r => r[0]);
    const nuevas = [
      ['parallax_1_quote', 'Cada propiedad tiene una historia. Nosotros la completamos.', 'ON'],
      ['parallax_2_quote', 'Seguridad jurídica y gestión inmobiliaria. En un solo lugar.', 'ON'],
    ].filter(([k]) => !existingKeys.includes(k));
    if (nuevas.length > 0) {
      const last = bannerSheet.getLastRow();
      bannerSheet.getRange(last + 1, 1, nuevas.length, 3).setValues(nuevas);
    }
  }

  // ============================================================
  // SUCESIONES — config (Clave / Valor / ON_OFF)
  // ============================================================
  poblar('sucesiones', [
    ['Clave', 'Valor', 'ON_OFF'],
    ['titulo', 'Tu Sucesión, resuelta para vender.', 'ON'],
    ['subtitulo', 'En JOIN unificamos la gestión legal y la comercialización inmobiliaria, para que vender una propiedad heredada sea un proceso ágil, recuperes tu tranquilidad y el valor de tu patrimonio.', 'ON'],
    ['parallax_quote', 'El tiempo importa. La burocracia no debería ser tu problema.', 'ON'],
    ['parallax_sub', 'Iniciamos los trámites sin honorarios previos. Los cobros se realizan al vender.', 'ON'],
    ['section_porque_titulo', '¿Por qué elegirnos para tramitar la sucesión?', 'ON'],
    ['section_porque_sub', 'La mayoría de las personas se ven obligadas a coordinar con un abogado por un lado y una inmobiliaria por otro, lo que genera demoras y desinteligencias. En JOIN, somos un solo equipo con una visión dual.', 'ON'],
    ['section_proceso_titulo', 'Nuestro proceso paso a paso', 'ON'],
    ['section_docs_titulo', '¿Qué documentación necesitás para comenzar?', 'ON'],
    ['section_docs_sub', 'Para iniciar el análisis de forma inmediata, te solicitaremos:', 'ON'],
    ['section_faq_titulo', 'Preguntas frecuentes en sucesiones', 'ON'],
    ['contacto_titulo', 'No dejes que la burocracia detenga tus proyectos.', 'ON'],
    ['contacto_sub', 'Contactanos para analizar tu caso.', 'ON'],
  ]);

  // ============================================================
  // SUCESIONES — por qué
  // ============================================================
  poblar('sucesiones_porque', [
    ['Icono', 'Titulo', 'Texto', 'ON_OFF'],
    ['Users', 'Interlocutor Único', 'Un solo contacto para todo el proceso, desde el juzgado hasta la escritura. Se evitan los "teléfonos descompuestos" entre profesionales y se eliminan las demoras por falta de coordinación.', 'ON'],
    ['Zap', 'Aceleración de Plazos', 'Utilizamos herramientas como el Tracto Abreviado para que la propiedad llegue al mercado en tiempo récord, sin necesidad de doble inscripción registral.', 'ON'],
    ['DollarSign', 'Honorarios contra Venta', 'Nuestro mayor compromiso es el resultado. Iniciamos los trámites sin desembolsos previos de honorarios profesionales; los mismos se cancelan al concretar la operación inmobiliaria.', 'ON'],
  ]);

  // ============================================================
  // SUCESIONES — proceso paso a paso
  // ============================================================
  poblar('sucesiones_proceso', [
    ['Numero', 'Titulo', 'Texto', 'ON_OFF'],
    ['01', 'Consulta Inicial y Diagnóstico', 'Agendamos una reunión (presencial o virtual) para conocer tu caso y establecer las bases de la solución.', 'ON'],
    ['02', 'Estrategia Legal y Auditoría', 'Analizamos el contexto familiar y jurídico del inmueble para trazar una hoja de ruta que destrabe cualquier obstáculo.', 'ON'],
    ['03', 'Propuesta Integral', 'Te presentamos un plan que incluye la gestión legal y comercial, bajo nuestro modelo de Honorarios contra la venta o plan de pago (si no necesitás vender).', 'ON'],
    ['04', 'Documentación e Inicio', 'Con tu aprobación, recolectamos la documentación necesaria e iniciamos formalmente el expediente judicial y el plan de comercialización del inmueble.', 'ON'],
  ]);

  // ============================================================
  // SUCESIONES — documentación requerida
  // ============================================================
  poblar('sucesiones_docs', [
    ['Icono', 'Titulo', 'Texto', 'ON_OFF'],
    ['FileText', 'Partida de Defunción (Original)', 'Del causante, obtenida en el Registro Civil.', 'ON'],
    ['Users', 'Partidas de vínculo', 'Nacimiento, matrimonio o testamento para acreditar los lazos con el causante.', 'ON'],
    ['Home', 'Título de Propiedad', 'Original o copia del bien inmueble a transmitir.', 'ON'],
    ['Receipt', 'Boleta de Impuesto Inmobiliario', 'ABL / ARBA u organismo de recaudación correspondiente.', 'ON'],
  ]);

  // ============================================================
  // SUCESIONES — FAQ
  // ============================================================
  poblar('sucesiones_faq', [
    ['Pregunta', 'Respuesta', 'ON_OFF'],
    ['¿Cuánto tiempo tarda el trámite judicial de la sucesión?', 'Tenemos casos en que la declaratoria de herederos se dictó en solo 2 meses desde el inicio del proceso. Pero no hay un tiempo estipulado: la relación entre los coherederos, el estado de la documentación y las diligencias del juzgado y registros son factores que pueden modificar sustancialmente los plazos.', 'ON'],
    ['¿Todos los herederos tienen que hacer la sucesión con el mismo abogado?', 'No, no es obligatorio y cada uno puede presentarse con un abogado distinto. Hay situaciones que lo ameritan, pero encarecen y alargan el proceso. Si entre los herederos hay buena relación, presentarse con un mismo abogado suele ser menos costoso y más ágil.', 'ON'],
    ['¿Puedo iniciar la sucesión si algún heredero se niega a iniciarla?', 'Sí y suele ser lo más recomendable para cuidar tus derechos. Quien inicia la sucesión debe denunciar la existencia de otros herederos, y se los notifica para que se presenten a hacer valer sus derechos.', 'ON'],
    ['¿Puedo vender un inmueble si aún no se dictó la declaratoria de herederos?', 'Para vender un inmueble heredado es necesario contar previamente con la declaratoria de herederos (en sucesiones ab-intestato) o la declaración de validez formal del testamento. No obstante, en algunos casos se puede iniciar la propuesta de comercialización mientras el proceso judicial avanza, para ganar tiempo.', 'ON'],
    ['¿Qué es el Tracto Abreviado?', 'Es una herramienta legal que permite vender el inmueble e inscribirlo directamente a nombre del comprador. Esto evita el doble gasto de inscripción y los tiempos de burocracia registral.', 'ON'],
    ['¿Tengo que pagar honorarios al inicio de la sucesión?', 'Consultanos por nuestra modalidad de honorarios contra venta, que se cancelan recién al momento de vender un bien de la herencia. En caso de que no se quiera vender ningún bien, consultanos por un plan de pago en cuotas y con facilidades.', 'ON'],
  ]);

  // ============================================================
  // TASACIONES — config
  // ============================================================
  poblar('tasaciones', [
    ['Clave', 'Valor', 'ON_OFF'],
    ['titulo', '¿Querés vender o alquilar tu propiedad?', 'ON'],
    ['subtitulo_1', 'Todos prometen lo mismo: "vendemos rápido", "trato personalizado", pero tu propiedad no se vende con frases hechas. Para vender es necesario contar con una tasación correcta, una clara estrategia de comercialización y conocimientos legales para redactar acuerdos.', 'ON'],
    ['subtitulo_2', 'En JOIN analizamos propiedades comparables y su tiempo en el mercado, revisamos métricas de visitas, efectuamos un seguimiento semanal y ejecutamos correcciones para lograr resultados concretos. No es magia. Es experiencia, análisis y trabajo.', 'ON'],
    ['cta_label', 'Conocé el valor de tu propiedad →', 'ON'],
    ['section_docs_titulo', 'Documentación y gestiones para vender', 'ON'],
    ['section_docs_sub', 'Desde el inicio elaboramos una carpeta con la documentación necesaria para que no haya sorpresas al momento de la venta.', 'ON'],
    ['section_propuesta_titulo', '¿Qué incluye nuestra propuesta de valor?', 'ON'],
    ['section_propuesta_sub', 'En el mercado actual es imprescindible contar con una clara propuesta de comercialización y producción multimedia que destaque el potencial de tu propiedad.', 'ON'],
    ['section_faq_titulo', 'Preguntas frecuentes sobre el proceso de venta', 'ON'],
    ['section_faq_sub', 'Sabemos que vender una propiedad es una de las decisiones financieras más importantes. Aquí respondemos las dudas más comunes.', 'ON'],
    ['contacto_titulo', 'Pedí tu tasación y conocé el valor de tu propiedad', 'ON'],
  ]);

  // ============================================================
  // TASACIONES — documentación
  // ============================================================
  poblar('tasaciones_docs', [
    ['Icono', 'Titulo', 'Texto', 'ON_OFF'],
    ['FileText', 'Título de la propiedad', 'Documentación que acredita la titularidad del inmueble.', 'ON'],
    ['User', 'DNI de los titulares', 'Identificación de todos los propietarios registrales.', 'ON'],
    ['Search', 'Informes de dominio e inhibición', 'Verificación de cargas, gravámenes y deudas sobre el inmueble.', 'ON'],
    ['FileCheck', 'Autorización de venta', 'Contrato de corretaje que nos habilita a comercializar la propiedad.', 'ON'],
    ['BarChart2', 'Propuesta de comercialización', 'Estrategia de precios y canales basada en comparables reales del mercado.', 'ON'],
    ['Camera', 'Producción multimedia', 'Fotografía profesional, video recorrido, tour 360° y plano ilustrativo.', 'ON'],
  ]);

  // ============================================================
  // TASACIONES — propuesta de valor
  // ============================================================
  poblar('tasaciones_propuesta', [
    ['Icono', 'Titulo', 'Texto', 'ON_OFF'],
    ['Camera', 'Fotografías profesionales', 'No sacamos fotos "rápidas". Preparamos la propiedad, cuidamos los detalles y capturamos la mejor luz, ángulos y encuadres para mostrar todo su potencial. Las fotos de calidad generan más clicks, más consultas y más visitas.', 'ON'],
    ['Film', 'Video recorrido', 'Generamos videos que muestran la propiedad de forma clara, dinámica y atractiva. Permite que los compradores se imaginen viviendo allí antes de visitarla. Pensamos el recorrido, los planos y el ritmo para que sea interesante.', 'ON'],
    ['Globe', 'Tour virtual interactivo 360°', 'Creamos recorridos interactivos donde los compradores pueden recorrer la propiedad desde su casa. Es fundamental para filtrar curiosos y atraer a los interesados reales, ahorrando tiempo al propietario.', 'ON'],
    ['MapPin', 'Plano ilustrativo', 'Mostramos la distribución de la propiedad de forma clara con planos legibles que ayudan a entender la comunicación entre los espacios antes de visitarla y reducir dudas.', 'ON'],
    ['Layers', 'Virtual Staging', 'Realizamos un amoblamiento virtual de espacios vacíos, que ayuda a los compradores a visualizar el potencial del diseño interior y la decoración del inmueble.', 'ON'],
  ]);

  // ============================================================
  // TASACIONES — FAQ
  // ============================================================
  poblar('tasaciones_faq', [
    ['Pregunta', 'Respuesta', 'ON_OFF'],
    ['¿Qué es la tasación y por qué es tan importante?', 'Una tasación es un proceso técnico a cargo de un profesional idóneo para estimar el valor de un bien en el mercado. El método más utilizado en el mercado inmobiliario es el de comparables, que requiere un análisis exhaustivo del mercado y de la situación jurídica de la propiedad. La tasación es el primer paso indispensable para una operación exitosa porque da una aproximación del valor objetivo, real y realizable.', 'ON'],
    ['¿Qué es la autorización de venta y por cuánto tiempo se otorga?', 'La autorización de venta es un contrato de corretaje entre los propietarios y la inmobiliaria para que ésta pueda comercializar la propiedad en las condiciones pactadas. Trabajamos con un plazo estándar de 120 días que nos permite ejecutar toda la producción de la comercialización. Efectuamos un seguimiento semanal: si la propiedad no recibe consultas, analizamos las métricas y corregimos la estrategia de inmediato.', 'ON'],
    ['¿Es recomendable firmar una autorización en exclusiva?', 'Sí, y lo es en beneficio de tu propiedad. Cuando muchas agencias publican lo mismo, el mensaje se debilita y el valor percibido por los compradores se deprecia. La exclusividad nos permite invertir en producción multimedia de alto nivel y garantiza que seamos los únicos responsables de defender el precio de tu patrimonio ante cada oferta.', 'ON'],
    ['¿Cómo coordinan las visitas para no afectar mi rutina?', 'Filtramos a los interesados. Gracias al Tour Virtual 360° y al Video Recorrido, quienes solicitan una visita presencial ya conocen la distribución y el estado real de la propiedad. Esto reduce las visitas de "curiosos" y asegura que solo abras tu puerta a compradores con intención real de cierre.', 'ON'],
  ]);

  // ============================================================
  // JURÍDICO — config
  // ============================================================
  poblar('juridico', [
    ['Clave', 'Valor', 'ON_OFF'],
    ['titulo', 'Áreas de Práctica Legal', 'ON'],
    ['subtitulo', 'Asesoramiento legal integral con un enfoque preventivo y soluciones estratégicas para particulares, inversores y empresas. Hacé click en cada área para conocer más.', 'ON'],
    ['contacto_titulo', '¿Tenés una consulta legal?', 'ON'],
    ['contacto_sub', 'Contanos tu caso y te orientamos sin compromiso.', 'ON'],
  ]);

  // ============================================================
  // JURÍDICO — áreas de práctica (flip cards)
  // Iconos válidos: SplitSquareVertical, Gavel, Landmark, FileText,
  //                 DollarSign, Receipt, Heart, ShieldCheck, Car
  // ============================================================
  poblar('juridico_areas', [
    ['Icono', 'Titulo', 'Descripcion', 'ON_OFF'],
    ['SplitSquareVertical', 'División de Condominio', 'Cuando los condóminos no pueden ponerse de acuerdo, iniciamos la acción judicial para dividir el bien en especie o venderlo y liquidar el producido en proporción a las alícuotas.', 'ON'],
    ['Gavel', 'Desalojos', 'Acciones ágiles frente a la falta de pago, vencimiento de contrato o intrusiones. Representamos al propietario en mediaciones y en todas las etapas judiciales para recuperar la tenencia del inmueble.', 'ON'],
    ['Landmark', 'Usucapión', 'Regularización dominial de inmuebles poseídos de forma pública, pacífica y continua por el plazo que fija la ley. Tramitamos la obtención judicial del título de propiedad definitivo.', 'ON'],
    ['FileText', 'Contratos a Medida', 'Redacción y revisión minuciosa de contratos de locación, boletos de compraventa, reservas, cesiones de derechos y todo tipo de acuerdo vinculado a operaciones inmobiliarias.', 'ON'],
    ['DollarSign', 'Cobro de Alquileres', 'Gestión extrajudicial y judicial del cobro de alquileres impagos. Iniciamos el proceso de desalojo y de cobro en forma simultánea para recuperar lo adeudado en el menor tiempo posible.', 'ON'],
    ['Receipt', 'Ejecución de Expensas', 'Representamos a administraciones y consorcios en el cobro de expensas ordinarias y extraordinarias mediante el proceso ejecutivo, la más rápida vía judicial disponible.', 'ON'],
    ['Heart', 'Divorcios', 'Tramitamos divorcios express unilaterales o de mutuo acuerdo, convenios reguladores de bienes, régimen de comunicación parental, alimentos y liquidación de sociedad conyugal.', 'ON'],
    ['ShieldCheck', 'Derecho del Consumidor', 'Reclamos ante la Defensa del Consumidor, acciones judiciales por daños y perjuicios vinculados a relaciones de consumo, productos defectuosos y prácticas abusivas de empresas.', 'ON'],
    ['Car', 'Accidentes de Tránsito', 'Representación de víctimas de accidentes viales para reclamar daños físicos, psicológicos y materiales ante las aseguradoras y los responsables, en sede civil o penal.', 'ON'],
  ]);

  // ============================================================
  // VALORES — Por qué elegirnos (pestañas principales)
  // REPUESTO: antes tenía otra estructura. Ahora: Numero/Icono/Titulo/Intro/ON_OFF
  // Iconos válidos: Shield, Camera, Users
  // ============================================================
  poblar('valores', [
    ['Numero', 'Icono', 'Titulo', 'Intro', 'ON_OFF'],
    ['01', 'Shield', 'Mayor Seguridad Jurídica', 'Tu tranquilidad no es un accesorio, es nuestra prioridad absoluta. A diferencia del modelo tradicional, en JOIN somos la inmobiliaria y el estudio jurídico en una sola estructura. Esta integración nos permite actuar con velocidad y precisión en cada etapa de la operación.', 'ON'],
    ['02', 'Camera', 'Comercialización de Vanguardia', 'Utilizamos tecnología para transformar cada inmueble en una experiencia inmersiva para los compradores y acelerar la toma de decisiones. En el mercado actual, la producción multimedia de alta calidad es indispensable.', 'ON'],
    ['03', 'Users', 'Socio Estratégico', 'No solo gestionamos propiedades; resolvemos los obstáculos legales que te impiden disponer de ellas. Somos el aliado clave para quienes necesitan iniciar una sucesión como paso previo obligatorio para concretar una venta.', 'ON'],
  ]);

  // ============================================================
  // VALORES_ITEMS — sub-items de cada razón
  // Razon_Num = Numero de la pestaña en la hoja "valores"
  // ============================================================
  poblar('valores_items', [
    ['Razon_Num', 'Titulo', 'Texto', 'ON_OFF'],
    ['01', 'Acelerar procesos complejos', 'Estudiamos las particularidades de cada caso, exploramos las alternativas viables y accionamos su implementación de forma inmediata.', 'ON'],
    ['01', 'Viabilizar operaciones difíciles', 'Analizamos y destrabamos casos que otras agencias suelen rechazar por falta de especialización técnica en derecho inmobiliario.', 'ON'],
    ['01', 'Garantizar cierres seguros', 'Cada documento que firmás cuenta con el respaldo de expertos que comprenden tanto el mercado inmobiliario como el marco legal que lo rige.', 'ON'],
    ['02', 'Fotografía de Alta Calidad', 'Capturamos la esencia y los mejores ángulos de tu propiedad con equipos de nivel editorial, garantizando una primera impresión inmejorable.', 'ON'],
    ['02', 'Video Recorrido', 'Realizamos piezas audiovisuales dinámicas que permiten al interesado "caminar" la propiedad desde su dispositivo, generando un vínculo emocional inmediato.', 'ON'],
    ['02', 'Tour Virtual 360°', 'Permitimos inspeccionar cada rincón de la propiedad con total libertad, las 24 horas del día, desde cualquier lugar del mundo.', 'ON'],
    ['03', 'Interlocutor Único', 'Se evitan los "teléfonos descompuestos" entre profesionales. Nos encargamos de todo el ciclo: desde el inicio de la sucesión hasta la firma de la escritura traslativa de dominio.', 'ON'],
    ['03', 'Facilidad de Honorarios', 'Apostamos al resultado y alineamos nuestros incentivos con los tuyos. Nuestros honorarios profesionales se cancelan al concretar la operación inmobiliaria.', 'ON'],
    ['03', 'Especialización', 'No somos generalistas. Somos expertos en sucesiones, lo que nos permite anticiparnos a los conflictos y acelerar los plazos mediante herramientas como el tracto abreviado.', 'ON'],
  ]);

  // ============================================================
  // LOG DE GIDs — copiar estos valores a google-sheets.js
  // ============================================================
  const gidsLog = ['=== GIDs para google-sheets.js ==='];
  ss.getSheets().forEach(s => {
    gidsLog.push(`  ${s.getName()}: '${s.getSheetId()}',`);
  });
  Logger.log(gidsLog.join('\n'));

  SpreadsheetApp.getUi().alert(
    '¡Pestañas creadas y pobladas!\n\n' +
    'Ahora:\n' +
    '1. Ver > Registros de ejecución → copiar los GIDs\n' +
    '2. Actualizar GIDS en src/lib/google-sheets.js\n' +
    '3. Publicar el sheet (Archivo > Compartir > Publicar en la web)\n' +
    '    → elegir cada nueva pestaña y publicar como CSV'
  );
}
