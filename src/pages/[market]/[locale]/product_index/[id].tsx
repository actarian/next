
import { Breadcrumb, Headline, Layout, ProductItem } from '@components/index';
import { asStaticProps } from '@core/index';
import { Grid } from '@geist-ui/core';
import { getLayout, getPage, getProducts, getStaticPathsForSchema, IProduct, PageProps } from '@models/index';
import { GetStaticPropsContext } from 'next/types';

export default function Products({ layout, page, products, params }: ProductsProps) {

  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        {products &&
          <Grid.Container gap={2} justify="flex-start">
            {products.map((item) =>
              <Grid xs={24} sm={12} md={8} key={item.id}>

                <ProductItem item={item} />

              </Grid>
            )}
          </Grid.Container>
        }

      </Layout>
    </>
  )
}

export interface ProductsProps extends PageProps {
  products: IProduct[];
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('product_index', id, market, locale);
  const products = await getProducts({ market, locale });
  const props = asStaticProps({ ...context, layout, page, products });
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
