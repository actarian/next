import Container from '@components/container/container';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils/utils.service';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import { Product } from '@models/product/product';
import { getProducts } from '@models/product/product.service';
import { Box } from '@strapi/design-system/Box';
import { GridLayout } from '@strapi/design-system/Layout';
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
        <Container>
          <Headline title={title} abstract={abstract}></Headline>
          {products &&
            <Box padding={8} background="neutral100">
              <GridLayout>
                {products.map((item) => <ProductItem key={item.id} item={item} />)}
              </GridLayout>
            </Box>
          }
        </Container>
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
