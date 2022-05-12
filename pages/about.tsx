import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import { getMenu } from '../lib/menu/menu.service';

export default function About({ menu }) {
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>About</title>
        </Head>
        <Container>
          <h1>About</h1>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('About getStaticProps', params);
  const menu = await getMenu('header');
  return {
    props: {
      menu,
    },
  };
}
