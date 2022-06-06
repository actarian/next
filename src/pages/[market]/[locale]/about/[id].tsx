import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { getLayout } from '@models/layout/layout.service';
import { PageProps } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import { GetStaticPropsContext } from 'next/types';

export default function About({ layout, page, params }: PageProps) {
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

      </Layout>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('about', id, market, locale);
  const props = asStaticProps({ ...context, layout, page });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('about');
  return {
    paths,
    fallback: true,
  };
}
