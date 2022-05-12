import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import { getMenu } from '../lib/menu/menu.service';

export default function Custom404({ menu }) {
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>404 Not Found</title>
        </Head>
        <Container>
          <h1>404 - Page Not Found</h1>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('Custom404 getStaticProps', params);
  const menu = await getMenu('header');
  return {
    props: {
      menu,
    },
  };
}
