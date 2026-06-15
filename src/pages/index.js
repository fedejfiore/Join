import { getAllSiteData } from '../lib/google-sheets';
import Layout from '../components/layout/Layout';
import HeroJoin from '../components/sections/HeroJoin';
import ServiciosJoin from '../components/sections/ServiciosJoin';
import NosotrosJoin from '../components/sections/NosotrosJoin';
import PorQueElegirnos from '../components/sections/PorQueElegirnos';
import BlogPreviewJoin from '../components/sections/BlogPreviewJoin';
import ContactoJoin from '../components/sections/ContactoJoin';

const PARALLAX_BANNERS = [
  {
    bg: 'linear-gradient(135deg, #0a0006 0%, #660033 50%, #1a0010 100%)',
    quote: 'Cada propiedad tiene una historia. Nosotros la completamos.',
  },
  {
    bg: 'linear-gradient(135deg, #1a0010 0%, #330019 40%, #660033 100%)',
    quote: 'Seguridad jurídica y gestión inmobiliaria. En un solo lugar.',
  },
];

function ParallaxDivider({ index = 0 }) {
  const b = PARALLAX_BANNERS[index % PARALLAX_BANNERS.length];
  return (
    <div style={{
      position: 'relative', height: '220px', overflow: 'hidden',
      background: b.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <p style={{
        position: 'relative', zIndex: 1,
        fontSize: 'clamp(1.1rem, 3vw, 1.75rem)', fontWeight: 800, color: 'rgba(255,255,255,0.92)',
        textAlign: 'center', maxWidth: '700px', padding: '0 2rem',
        lineHeight: 1.4, letterSpacing: '-0.02em',
      }}>
        {b.quote}
      </p>
    </div>
  );
}

export default function Home({ data }) {
  if (!data) return null;
  const { setup, brand, banner, nosotros, servicios, valores, noticias } = data;
  return (
    <Layout data={data}>
      {setup.banner?.status !== 'OFF'   && <HeroJoin config={banner} brand={brand} />}
      {setup.servicios?.status !== 'OFF' && <ServiciosJoin servicios={servicios} />}
      <ParallaxDivider index={0} />
      {setup.nosotros?.status !== 'OFF'  && <NosotrosJoin data={nosotros} />}
      {setup.valores?.status !== 'OFF'   && <PorQueElegirnos valores={valores} />}
      <ParallaxDivider index={1} />
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