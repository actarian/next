import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import { Page } from '@models/page/page';
import { getPageByCollectionAndId } from '@models/page/page.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function About({ header, page, locales, locale }: AboutProps) {
  if (!page) {
    return;
  }
  return (
    <>
      <Layout header={header}>
        <Head>
          <title>{page.title}</title>
        </Head>
        <Breadcrumb items={page.breadcrumb} />
        <Headline title={page.title} abstract={page.abstract}></Headline>
      </Layout>
    </>
  )
}

export interface AboutProps extends PageType {
  header: Menu;
  page: Page;
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const page = await getPageByCollectionAndId('about', 1);
  const props = asStaticProps({ ...context, header, page });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}
