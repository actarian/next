import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import Head from 'next/head';
import { PageType } from 'types';

export default function Custom404({ page, params }: Custom404Props) {
  // console.log('Custom404.params', page, params);
  return (
    <>
      <Layout page={page}>

        <Head>
          <title>{page.title}</title>
        </Head>

        <Headline title={page.title} abstract={page.abstract}></Headline>

      </Layout>
    </>
  )
}

export interface Custom404Props extends PageType {
  page: any;
}

export async function getStaticProps(context) {
  const title = 'Page Not Found';
  const abstract = 'The page you are looking for does not exist.';
  const page = {
    title,
    abstract,
    meta: {
      title,
      description: abstract,
      keywords: '',
      robots: 'all',
    },
    markets: [],
    locales: [],
  };
  // console.log('Custom404 getStaticProps', props);
  const props = asStaticProps({ ...context, page });
  return {
    props,
  };
}
