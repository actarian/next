import Banner from '@components/banner/banner';
import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Button, Display, Grid, Image, Text } from '@geist-ui/core';
import { Menu } from '@models/menu/menu';
import { getMenu } from '@models/menu/menu.service';
import { getPageByCollectionAndId } from '@models/page/page.service';
import Head from 'next/head';
import React from 'react';
import { PageType } from 'types';

const githubRepoUrl = 'https://github.com/actarian/next';
const documentationUrl = 'https://geist-ui.dev/en-us/guide/colors';

export default function Index({ page, header, locales, locale }: IndexProps) {
  if (!page) {
    return;
  }
  // console.log('Index', header, locales, locale);
  /*
  const { response } = useApiGet('/hello');
  if (response) {
    console.log('response', response);
  }
  */
  const windowOpen = (url: string) => window.open(url);

  return (
    <>
      <Banner />

      <Layout header={header}>

        <Head>
          <title>{page.title}</title>
        </Head>

        <Breadcrumb items={page.breadcrumb} />

        <Text h1>{page.title}</Text>

        <Display title={page.title} caption={page.abstract}>
          <Image src="/assets/homepage/banner.png" alt={page.title} draggable={false} />
        </Display>

        <Grid.Container justify="center" gap={3} mt="100px">
          <Grid xs={20} sm={7} justify="center">

            <Button shadow type="secondary-light" width="100%" onClick={() => windowOpen(githubRepoUrl)}> GitHub Repo </Button>

          </Grid>
          <Grid xs={0} sm={3} />
          <Grid xs={20} sm={7} justify="center">

            <Button width="100%" onClick={() => windowOpen(documentationUrl)}> Theme Documentation </Button>

          </Grid>
        </Grid.Container>

      </Layout>
    </>
  )
}

export interface IndexProps extends PageType {
  page: any;
  header: Menu;
}

export async function getStaticProps(context) {
  const page = await getPageByCollectionAndId('homepage', 1);
  const header = await getMenu('header');
  const props = asStaticProps({ ...context, page, header });
  // console.log('Index getStaticProps', props, context);
  return {
    props,
  };
}
