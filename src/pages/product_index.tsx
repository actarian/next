import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Grid } from '@geist-ui/core';
import { Menu } from '@models/menu/menu';
import { getMenu } from '@models/menu/menu.service';
import { Page } from '@models/page/page';
import { getPageByCollectionAndId } from '@models/page/page.service';
import { Product } from '@models/product/product';
import { getProducts } from '@models/product/product.service';
import Head from 'next/head';
import { PageType } from 'types';

export default function Products({ page, products, header, locales, locale }: ProductsPageProps) {
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
  page: Page;
  products: Product[];
  header: Menu;
}

export async function getStaticProps(context) {
  const page = await getPageByCollectionAndId('product_index', 1);
  const products = await getProducts();
  const header = await getMenu('header');
  const props = asStaticProps({ ...context, page, products, header });
  // console.log('Products getStaticProps', props);
  return {
    props,
  };
}
