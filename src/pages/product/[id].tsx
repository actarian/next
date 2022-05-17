import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asLocalizedPaths, asStaticProps } from '@core/utils';
import { Button, Card, Grid, Image, Note, Spacer, Text } from '@geist-ui/core';
import { ArrowRight } from '@geist-ui/icons';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import { Product } from '@models/product/product';
import { getProduct, getProducts } from '@models/product/product.service';
import { P } from '@pipes/pipes';
import Head from 'next/head';
import { PageType } from 'types';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function ProductPage({ header, product, params, locales, locale }: ProductPageProps) {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log('Product', id, header, product, locales, locale);
  if (!product) {
    return;
  }
  // console.log(product);
  return (
    <>
      <Layout header={header}>
        <Head>
          <title>{product.title}</title>
        </Head>
        <Headline title={product.title} abstract={product.abstract}></Headline>
        <Grid.Container gap={1.5}>
          <Grid xs={12} justify="center" alignItems="flex-start">
            <Card width="100%" type="dark">
              <Image alt={product.title} src={product.image} />
            </Card>
          </Grid>
          <Grid xs={12} justify="center" alignItems="flex-start">
            <Card width="100%">
              {product.description && <Text>{<div className="wysiwyg" dangerouslySetInnerHTML={{ __html: product.description }} />}</Text>}
              <Card.Footer>
                <Button type="success" icon={<ArrowRight />} auto>Buy {P(product.price, P.price())}</Button>
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
  header: Menu;
  product: Product;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  // console.log('Product getStaticProps', id);
  const product = await getProduct(id);
  // console.log('Product getStaticProps', product);
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ product, header, ...context });
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
