import { getAllSiteData } from '../lib/google-sheets';
import Layout from '../components/layout/Layout';
import HeroJoin from '../components/sections/HeroJoin';
import ServiciosJoin from '../components/sections/ServiciosJoin';
import NosotrosJoin from '../components/sections/NosotrosJoin';
import PorQueElegirnos from '../components/sections/PorQueElegirnos';
import BlogPreviewJoin from '../components/sections/BlogPreviewJoin';
import ContactoJoin from '../components/sections/ContactoJoin';

export default function Home({ data }) {
  if (!data) return null;
  const { setup, brand, banner, nosotros, servicios, valores, noticias } = data;
  return (
    <Layout data={data}>
      {setup.banner?.status !== 'OFF'   && <HeroJoin config={banner} brand={brand} />}
      {setup.servicios?.status !== 'OFF' && <ServiciosJoin servicios={servicios} />}
      {setup.nosotros?.status !== 'OFF'  && <NosotrosJoin data={nosotros} />}
      {setup.valores?.status !== 'OFF'   && <PorQueElegirnos valores={valores} />}
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