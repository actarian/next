import Container from '@components/container/container';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils/utils.service';
import { useApiGet } from '@hooks/useApi/useApi';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import Head from 'next/head';
import React from 'react';
import { PageType } from 'types';
import styles from './index.module.scss';

export default function Index({ header, params }: IndexProps) {
  const title = 'Index';
  const abstract = 'Lorem ipsum dolor sit amet';

  const { response } = useApiGet('/hello');
  if (response) {
    console.log('response', response);
  }

  return (
    <>
      <div className={styles.yellow}>YELLOW</div>
      <Layout header={header}>
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

export interface IndexProps extends PageType {
  header: Menu;
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ ...context, header });
  // console.log('Index getStaticProps', props);
  return {
    props,
  };
}
