import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import Head from 'next/head';
import { PageType } from 'types';

export default function Custom404({ header, locales, locale }: Custom404Props) {
  const title = 'Error 404';
  const abstract = 'Page not found';
  return (
    <>
      <Layout header={header}>
        <Head>
          <title>{title}</title>
        </Head>
        <Headline title={title} abstract={abstract}></Headline>
      </Layout>
    </>
  )
}

export interface Custom404Props extends PageType {
  header: Menu;
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ ...context, header });
  // console.log('Custom404 getStaticProps', props);
  return {
    props,
  };
}
