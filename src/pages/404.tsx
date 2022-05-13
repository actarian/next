import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/_layout';
import { Menu } from '@core/menu/menu';
import { getCachedMenu } from '@core/menu/menu.service';
import { asStaticProps } from '@core/utils/utils.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function Custom404({ menu, params }: Custom404Props) {
  const title = 'Error 404';
  const abstract = 'Page not found';
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

export interface Custom404Props extends PageType {
  menu: Menu[];
}

export async function getStaticProps(params) {
  const menu = await getCachedMenu('header');
  const props = asStaticProps({ ...params, menu });
  // console.log('Custom404 getStaticProps', props);
  return {
    props,
  };
}
