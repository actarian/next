import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { PageProps } from '@models/page/page';
import { getErrorPageLayout } from '@models/page/page.service';
import Head from 'next/head';

export default function Custom404({ layout, page, params }: PageProps) {
  // console.log('Custom404.params', page, params);
  return (
    <>
      <Layout>

        <Head>
          <title>{page.title}</title>
        </Head>

        <Headline title={page.title} abstract={page.abstract}></Headline>

      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const { layout, page } = await getErrorPageLayout();
  // console.log('Custom404 getStaticProps', props);
  const props = asStaticProps({ ...context, layout, page });
  return {
    props,
  };
}
