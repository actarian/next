import Banner from '@components/banner/banner';
import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asStaticProps } from '@core/utils';
import { Button, Display, Grid, Image, Text } from '@geist-ui/core';
import { PageFull } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import React from 'react';
import { PageType } from 'types';

const githubRepoUrl = 'https://github.com/actarian/next';
const documentationUrl = 'https://geist-ui.dev/en-us/guide/colors';

export default function Homepage({ page, params }: HomepageProps) {
  if (!page) {
    return;
  }

  // console.log('Homepage.params', params);
  // console.log('Homepage.page', page);

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

      <Layout page={page}>

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

export interface HomepageProps extends PageType {
  page: PageFull;
  params: { id: IEquatable, market: string, locale: string };
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const page = await getPage('homepage', id, market, locale);
  const props = asStaticProps({ ...context, page });
  // console.log('Homepage getStaticProps', props, context);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('homepage');
  return {
    paths,
    fallback: true,
  };
}
