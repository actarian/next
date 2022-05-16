import Container from '@components/container/container';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils/utils.service';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import Head from 'next/head';
import { PageType } from 'types';

export default function About({ header, params }: AboutProps) {
  const title = 'About';
  const abstract = 'Lorem ipsum dolor sit amet';
  return (
    <>
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

export interface AboutProps extends PageType {
  header: Menu;
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ ...context, header });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}
