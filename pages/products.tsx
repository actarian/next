import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import { getMenu } from '../lib/menu/menu.service';

export default function Products({ menu }) {
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>Products</title>
        </Head>
        <Container>
          <h1>Products</h1>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('Products getStaticProps', params);
  const menu = await getMenu('header');
  return {
    props: {
      menu,
    },
  };
}
