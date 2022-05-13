import Container from '@components/container';
import Headline from '@components/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { Menu } from '@core/menu/menu';
import { getCachedMenu } from '@core/menu/menu.service';
import { Product } from '@core/product/product';
import { getProducts } from '@core/product/product.service';
import { asStaticProps } from '@core/utils/utils.service';
import { Box } from '@strapi/design-system/Box';
import { GridLayout } from '@strapi/design-system/Layout';
import Head from 'next/head';
import { IEquatable, PageType } from 'types';

export default function Products({ menu, products, params }: ProductsPageProps) {
  const title = 'Products';
  const abstract = 'Lorem ipsum dolor sit amet';
  return (
    <>
      <Layout menu={menu}>
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
  params: { id: IEquatable };
  menu: Menu[];
  products: Product[];
}

export async function getStaticProps(params) {
  const menu = await getCachedMenu('header');
  const products = await getProducts();
  const props = asStaticProps({ ...params, menu, products });
  // console.log('Products getStaticProps', props);
  return {
    props,
  };
}
