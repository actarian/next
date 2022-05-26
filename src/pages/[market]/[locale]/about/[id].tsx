import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { ILayout } from '@models/layout/layout';
import { IPage } from '@models/page/page';
import { IRouteParams } from '@models/route/route';
import { store } from '@models/store';
import { PageType } from 'types';

export default function About({ layout, page, params }: AboutProps) {
  if (!page) {
    return;
  }
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

      </Layout>
    </>
  )
}

export interface AboutProps extends PageType {
  layout: ILayout;
  page: IPage;
  params: IRouteParams;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await store.getLayout(market, locale);
  const page = await store.getPage('about', id, market, locale);
  const props = asStaticProps({ ...context, layout, page });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await store.getStaticPathsForSchema('about');
  return {
    paths,
    fallback: true,
  };
}
