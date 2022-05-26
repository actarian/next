import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Grid } from '@geist-ui/core';
import { PageLayout, PageParams } from '@models/page/page';
import { Product } from '@models/product/product';
import { store } from '@models/store';
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
  page: PageLayout;
  products: Product[];
  params: PageParams;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const page = await store.getPageLayout('product_index', id, market, locale);
  const products = await store.getProducts({ market, locale });
  const props = asStaticProps({ ...context, page, products });
  // console.log('Products getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await store.getStaticPathsForSchema('product_index');
  return {
    paths,
    fallback: true,
  };
}
