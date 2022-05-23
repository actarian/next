import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Grid } from '@geist-ui/core';
import { Page } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { Product } from '@models/product/product';
import { getProducts } from '@models/product/product.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import { PageType } from 'types';

export default function Products({ page, products, params }: ProductsPageProps) {
  if (!page) {
    return;
  }
  return (
    <>
      <Layout page={page}>

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
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const page = await getPage('product_index', id, market, locale);
  const products = await getProducts();
  const props = asStaticProps({ ...context, page, products });
  // console.log('Products getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('product_index');
  return {
    paths,
    fallback: true,
  };
}

