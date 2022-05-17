import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils/utils.service';
import { Button, Display, Grid, Image, Text, useTheme } from '@geist-ui/core';
import { useApiGet } from '@hooks/useApi/useApi';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import Head from 'next/head';
import React from 'react';
import { PageType } from 'types';

const githubRepoUrl = 'https://github.com/actarian/next';
const documentationUrl = 'https://geist-ui.dev/en-us/guide/colors';

export default function Index({ header, params }: IndexProps) {
  const { palette } = useTheme();

  const title = 'Index';
  const abstract = 'Lorem ipsum dolor sit amet';

  const { response } = useApiGet('/hello');
  if (response) {
    console.log('response', response);
  }

  const redirectToUrl = (url: string) => window.open(url);

  return (
    <>
      <Display padding="20px" margin="0" style={{ backgroundColor: palette.cyan }}>
        <Text h3 margin="0">Banner</Text>
      </Display>
      <Layout header={header}>
        <Head>
          <title>{title}</title>
        </Head>
        <Breadcrumb></Breadcrumb>
        <Text h1>Start our Geist journey.</Text>
        <Display title={title} caption={abstract}>
          <Image src="/assets/homepage/banner.png" alt={title} draggable={false} />
        </Display>
        <Grid.Container justify="center" gap={3} mt="100px">
          <Grid xs={20} sm={7} justify="center">
            <Button shadow type="secondary-light" width="100%" onClick={() => redirectToUrl(githubRepoUrl)}> GitHub Repo </Button>
          </Grid>
          <Grid xs={0} sm={3} />
          <Grid xs={20} sm={7} justify="center">
            <Button width="100%" onClick={() => redirectToUrl(documentationUrl)}> Theme Documentation </Button>
          </Grid>
        </Grid.Container>
      </Layout>
    </>
  )
}

export interface IndexProps extends PageType {
  header: Menu;
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ ...context, header });
  // console.log('Index getStaticProps', props);
  return {
    props,
  };
}
