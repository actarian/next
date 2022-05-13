import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/_layout';
import { Menu } from '@core/menu/menu';
import { getCachedMenu } from '@core/menu/menu.service';
import { asStaticProps } from '@core/utils/utils.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function About({ menu, params }: AboutProps) {
  const title = 'About';
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

export interface AboutProps extends PageType {
  menu: Menu[];
}

export async function getStaticProps(params) {
  const menu = await getCachedMenu('header');
  const props = asStaticProps({ ...params, menu });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}
