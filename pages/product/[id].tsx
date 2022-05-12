import Head from 'next/head';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getProducts } from '../../edge/product/product.service';
import { getMenu } from '../../lib/menu/menu.service';

export default function Product({ menu, params }) {
  console.log('Product', menu, params);
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
