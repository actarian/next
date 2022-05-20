import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Menu } from '@models/menu/menu';
import { getMenu } from '@models/menu/menu.service';
import { Page } from '@models/page/page';
import { getPageByCollectionAndId } from '@models/page/page.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function About({ page, header, locales, locale }: AboutProps) {
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
  page: Page;
  header: Menu;
}

export async function getStaticProps(context) {
  const page = await getPageByCollectionAndId('about', 1);
  const header = await getMenu('header');
  const props = asStaticProps({ ...context, page, header });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}
