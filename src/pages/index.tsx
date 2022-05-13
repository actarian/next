import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/layout';
import { getCachedMenu } from '@core/menu/menu.service';
import Head from 'next/head';
import React from 'react';

export default function Index({ menu }) {
  const title = 'Index';
  const abstract = 'Lorem ipsum dolor sit amet';
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <Headline title={title} abstract={abstract}></Headline>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  console.log('Index getStaticProps', params);
  const menu = await getCachedMenu('header');
  return {
    props: {
      menu,
    },
  };
}
