import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/layout';
import ProductItem from '@components/product-item/product-item';
import { getCachedMenu } from '@core/menu/menu.service';
import { getProducts } from '@core/product/product.service';
import { Box } from '@strapi/design-system/Box';
import { GridLayout } from '@strapi/design-system/Layout';
import Head from 'next/head';

export default function Products({ menu, products }) {
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

export async function getStaticProps(params) {
  console.log('Products getStaticProps', params);
  const menu = await getCachedMenu('header');
  const products = await getProducts();
  return {
    props: {
      menu,
      products,
    },
  };
}
