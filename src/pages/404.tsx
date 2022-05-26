import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { ILayout } from '@models/layout/layout';
import { IPage } from '@models/page/page';
import { store } from '@models/store';
import Head from 'next/head';
import { PageType } from 'types';

export default function Custom404({ layout, page, params }: Custom404Props) {
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

export interface Custom404Props extends PageType {
  layout: ILayout;
  page: IPage;
}

export async function getStaticProps(context) {
  const { layout, page } = await store.getErrorPageLayout();
  // console.log('Custom404 getStaticProps', props);
  const props = asStaticProps({ ...context, layout, page });
  return {
    props,
  };
}
