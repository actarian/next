import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import { getMenu } from '../lib/menu/menu.service';
import styles from './index.module.scss';

export default function Index({ menu }) {
  console.log('Index', menu);
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>Index</title>
        </Head>
        <Container>
          <h1 className={styles.yellow}>Index</h1>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('Index getStaticProps', params);
  const menu = await getMenu('header');
  return {
    props: {
      menu,
    },
  };
}
