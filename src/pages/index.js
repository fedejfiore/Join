import { getAllSiteData } from '../lib/google-sheets';
import ParallaxSection from '../components/ui/ParallaxSection';
import Layout from '../components/layout/Layout';
import HeroJoin from '../components/sections/HeroJoin';
import ServiciosJoin from '../components/sections/ServiciosJoin';
import NosotrosJoin from '../components/sections/NosotrosJoin';
import PorQueElegirnos from '../components/sections/PorQueElegirnos';
import BlogPreviewJoin from '../components/sections/BlogPreviewJoin';
import ContactoJoin from '../components/sections/ContactoJoin';

const PARALLAX_DEFAULT = [
  'Cada propiedad tiene una historia. Nosotros la completamos.',
  'Seguridad jurídica y gestión inmobiliaria. En un solo lugar.',
];

export default function Home({ data }) {
  if (!data) return null;
  const { setup, brand, banner, nosotros, servicios, valores, valores_items, noticias } = data;
  return (
    <Layout data={data}>
      {setup.banner?.status !== 'OFF'   && <HeroJoin config={banner} brand={brand} />}
      {setup.servicios?.status !== 'OFF' && <ServiciosJoin servicios={servicios} />}
      <ParallaxSection style={{ height: '220px' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
          <p style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(1.1rem, 3vw, 1.75rem)', fontWeight: 800, color: '#ffffff', textAlign: 'center', maxWidth: '700px', lineHeight: 1.4, letterSpacing: '-0.02em' }}>
            {banner?.parallax_1_quote?.valor || PARALLAX_DEFAULT[0]}
          </p>
        </div>
      </ParallaxSection>
      {setup.nosotros?.status !== 'OFF'  && <NosotrosJoin data={nosotros} />}
      {setup.valores?.status !== 'OFF'   && <PorQueElegirnos valores={valores} valores_items={valores_items} />}
      <ParallaxSection style={{ height: '220px' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
          <p style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(1.1rem, 3vw, 1.75rem)', fontWeight: 800, color: '#ffffff', textAlign: 'center', maxWidth: '700px', lineHeight: 1.4, letterSpacing: '-0.02em' }}>
            {banner?.parallax_2_quote?.valor || PARALLAX_DEFAULT[1]}
          </p>
        </div>
      </ParallaxSection>
      {setup.noticias?.status !== 'OFF'  && <BlogPreviewJoin noticias={noticias} />}
      {setup.contacto?.status !== 'OFF'  && <ContactoJoin brand={brand} />}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getAllSiteData();
    return { props: { data } };
  } catch (e) {
    console.error("Error at getServerSideProps of Home:", e);
    return { props: { data: null } };
  }
}