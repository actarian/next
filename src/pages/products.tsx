import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils/utils.service';
import { Grid } from '@geist-ui/core';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import { Product } from '@models/product/product';
import { getProducts } from '@models/product/product.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function Products({ header, products }: ProductsPageProps) {
  const title = 'Products';
  const abstract = 'Lorem ipsum dolor sit amet';
  return (
    <>
      <Layout header={header}>
        <Head>
          <title>{title}</title>
        </Head>
        <Headline title={title} abstract={abstract}></Headline>
        {products &&
          <Grid.Container gap={2} justify="flex-start">
            {products.map((item) =>
              <Grid xs={8} key={item.id}>
                <ProductItem item={item} />
              </Grid>
            )}
          </Grid.Container>
        }
      </Layout>
    </>
  )
}

export interface ProductsPageProps extends PageType {
  header: Menu;
  products: Product[];
}

export async function getStaticProps(context) {
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const products = await getProducts();
  const props = asStaticProps({ ...context, header, products });
  // console.log('Products getStaticProps', props);
  return {
    props,
  };
}
