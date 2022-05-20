import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asLocalizedPaths, asStaticProps } from '@core/utils';
import { Button, Card, Grid, Image, Note, Spacer, Text } from '@geist-ui/core';
import { ArrowRight } from '@geist-ui/icons';
import { Menu } from '@models/menu/menu';
import { getMenu } from '@models/menu/menu.service';
import { getPageByCollectionAndId } from '@models/page/page.service';
import { getProducts } from '@models/product/product.service';
import { P } from '@pipes/pipes';
import Head from 'next/head';
import { PageType } from 'types';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function ProductPage({ page, header, params, locales, locale }: ProductPageProps) {
  /*
  const router = useRouter()
  const { id } = router.query;
  */
  if (!page) {
    return;
  }
  console.log('Product', page.description);
  return (
    <>
      <Layout header={header}>

        <Head>
          <title>{page.title}</title>
        </Head>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Grid.Container gap={1.5}>
          <Grid xs={12} justify="center" alignItems="flex-start">

            <Card width="100%" type="dark">
              <Image alt={page.title} src={page.image} />
            </Card>

          </Grid>
          <Grid xs={12} justify="center" alignItems="flex-start">

            <Card width="100%">
              {page.description && <Text p>{<span className="wysiwyg" dangerouslySetInnerHTML={{ __html: page.description }} />}</Text>}
              <Card.Footer>
                <Button type="success" icon={<ArrowRight />} auto>Buy {P(page.price, P.price())}</Button>
              </Card.Footer>
            </Card>

          </Grid>
        </Grid.Container>

        <Spacer h={.5} />

        <Note type="warning">This note details something important.</Note>

      </Layout>
    </>
  )
}

export interface ProductPageProps extends PageType {
  params: { id: IEquatable };
  page: any;
  header: Menu;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  // console.log('Product getStaticProps', id);
  const page = await getPageByCollectionAndId('product', id);
  const header = await getMenu('header');
  const props = asStaticProps({ ...context, page, header });
  // console.log('Product getStaticProps', props);
  return {
    props,
    // revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths({ locales }) {
  const products = await getProducts();
  const ids = products ? products.map(x => x.id) : [];
  // console.log('Product getStaticPaths', locales, ids);
  const paths = asLocalizedPaths(ids, locales);
  // console.log('Product getStaticPaths', paths);
  return {
    paths,
    fallback: true,
  }
}
