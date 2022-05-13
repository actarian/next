import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getProducts } from '../../edge/product/product.service';
import { getMenu } from '../../lib/menu/menu.service';

export default function Product({ menu, params }) {
  const router = useRouter()
  const { id } = router.query;
  console.log('Product', id, menu, params);
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>Product {params.id}</title>
        </Head>
        <Container>
          <h1>Product {params.id}</h1>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('Product getStaticProps', params);
  const menu = await getMenu('header');
  return {
    props: {
      menu,
      params: params.params,
      locales: params.locales || [],
      locale: params.locale || null,
      defaultLocale: params.defaultLocale || null,
    },
  }
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products?.map((x) => `/product/${x.id}`) || [],
    fallback: true,
  }
}
