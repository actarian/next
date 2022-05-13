import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/_layout';
import { Menu } from '@core/menu/menu';
import { getCachedMenu } from '@core/menu/menu.service';
import { asStaticProps } from '@core/utils/utils.service';
import Head from 'next/head';
import React from 'react';
import { PageType } from 'types';
import styles from './index.module.scss';

export default function Index({ menu, params }: IndexProps) {
  const title = 'Index';
  const abstract = 'Lorem ipsum dolor sit amet';
  return (
    <>
      <div className={styles.yellow}>YELLOW</div>
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

export interface IndexProps extends PageType {
  menu: Menu[];
}

export async function getStaticProps(params) {
  const menu = await getCachedMenu('header');
  const props = asStaticProps({ ...params, menu });
  // console.log('Index getStaticProps', props);
  return {
    props,
  };
}
