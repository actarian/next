
import { Headline, Layout } from '@components/index';
import { asStaticProps } from '@core/index';
import { getErrorPageLayout, PageProps } from '@models/index';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next/types';

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

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const { layout, page } = await getErrorPageLayout();
  // console.log('Custom404 getStaticProps', props);
  const props = asStaticProps({ ...context, layout, page });
  return {
    props,
  };
}
