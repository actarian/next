import Container from '@components/container';
import Headline from '@components/headline';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { getCachedMenu } from '@core/menu/menu.service';
import { Product } from '@core/product/product';
import { getProduct, getProducts } from '@core/product/product.service';
import { asStaticProps } from '@core/utils/utils.service';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { P } from 'src/@pipe/pipe';
import { PageType } from 'types';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function ProductPage({ menu, product, params }: ProductPageProps) {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log('Product', id, menu, product, params);
  if (!product) {
    return;
  }
  // console.log(product);
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
          { P(product.price, P.price()) }
        </Container>
      </Layout>
    </>
  )
}

export interface ProductPageProps extends PageType {
  params: { id: IEquatable };
  menu: any;
  product: Product;
}

export async function getStaticProps(params) {
  const id = parseInt(params.params.id);
  // console.log('Product getStaticProps', id);
  const product = await getProduct(id);
  // console.log('Product getStaticProps', product);
  const menu = await getCachedMenu('header');
  const props = asStaticProps({ product, menu, ...params });
  // console.log('Product getStaticProps', props);
  return {
    props,
  }
}

export async function getStaticPaths() {
  const products = await getProducts();
  const ids = products ? products.map(x => x.id) : [];
  return {
    paths: ids.map((id) => `/product/${id}`),
    fallback: true,
  }
}
