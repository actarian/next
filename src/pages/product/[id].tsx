import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/layout';
import { getCachedMenu } from '@core/menu/menu.service';
import { getProduct, getProducts } from '@core/product/product.service';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import Head from 'next/head';
import Image from 'next/image';
// import { useRouter } from 'next/router';

export default function Product({ menu, product, params }) {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log('Product', id, menu, product, params);
  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>{product.title}</title>
        </Head>
        <Container>
          <Headline title={product.title} abstract={product.abstract}></Headline>
          {
            product.description &&
            <Box paddingLeft={10} paddingRight={10} background="neutral100">
              <Typography>{<div className="wysiwyg" dangerouslySetInnerHTML={{ __html: product.description }} />}</Typography>
            </Box>
          }
          <Image alt={product.title} src={product.image} layout="intrinsic" width={200} height={200} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  // console.log('Product getStaticProps', params);
  const menu = await getCachedMenu('header');
  const product = await getProduct(params.params.id);
  return {
    props: {
      menu,
      product,
      params: params.params,
      locales: params.locales || [],
      locale: params.locale || null,
      defaultLocale: params.defaultLocale || null,
    },
  }
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products?.map((x) => `/product/${x.id}`) || [],
    fallback: true,
  }
}
