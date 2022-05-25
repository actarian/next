import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { PageLayout, PageParams } from '@models/page/page';
import { getPageLayout } from '@models/page/page.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import { PageType } from 'types';

export default function About({ page, params }: AboutProps) {
  if (!page) {
    return;
  }
  return (
    <>
      <Layout page={page}>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

      </Layout>
    </>
  )
}

export interface AboutProps extends PageType {
  page: PageLayout;
  params: PageParams;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const page = await getPageLayout('about', id, market, locale);
  const props = asStaticProps({ ...context, page });
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
