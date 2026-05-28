import { getAllSiteData } from '../lib/google-sheets';
import Layout from '../components/layout/Layout';

// SECCIONES
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Features from '../components/sections/Features';
import Process from '../components/sections/Process'; // <--- Nueva Sección
import Contact from '../components/sections/Contact';

export default function Home({ data }) {
  if (!data) return null;
  
  // Extraemos todas las pestañas necesarias del objeto data
  const { setup, brand, banner, nosotros, servicios, valores, proceso } = data;

  return (
    <Layout data={data}>
      
      {/* 1. HERO / BANNER */}
      {setup.banner?.status === 'ON' && <Hero config={banner} />}
      
      {/* 2. SOBRE NOSOTROS */}
      {setup.nosotros?.status === 'ON' && (
        <About data={nosotros} /> 
      )}

      {/* 3. PROCESO DE GESTIÓN (Nueva Sección) */}
      {setup.proceso?.status === 'ON' && (
        <Process pasos={proceso} />
      )}

      {/* 4. SERVICIOS */}
      {setup.servicios?.status === 'ON' && <Services servicios={servicios} />}
      
      {/* 5. VALORES / FEATURES */}
      {setup.valores?.status === 'ON' && <Features valores={valores} />}
      
      {/* 6. CONTACTO E INFORMACIÓN */}
      {(setup.contacto?.status === 'ON' || setup.formulario?.status === 'ON') && (
        <Contact 
          brand={brand} 
          showForm={setup.formulario?.status === 'ON'} 
          showInfo={setup.contacto?.status === 'ON'}
        />
      )}

    </Layout>
  );
}

// OBTENCIÓN DE DATOS (SSR con Revalidación)
export async function getStaticProps() {
  try {
    const data = await getAllSiteData();
    return { 
      props: { data }, 
      revalidate: 10 
    };
  } catch (error) {
    console.error("Error al obtener datos de Google Sheets:", error);
    return { props: { data: null } };
  }
}