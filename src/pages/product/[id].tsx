import Container from '@components/container/container';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asLocalizedPaths, asStaticProps } from '@core/utils/utils.service';
import { getCachedGlobal } from '@models/global/global.service';
import { Menu } from '@models/menu/menu';
import { Product } from '@models/product/product';
import { getProduct, getProducts } from '@models/product/product.service';
import { P } from '@pipes/pipes';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { PageType } from 'types';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function ProductPage({ header, product, params }: ProductPageProps) {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log('Product', id, header, product, params);
  if (!product) {
    return;
  }
  // console.log(product);
  return (
    <>
      <Layout header={header}>
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
          {P(product.price, P.price())}
        </Container>
      </Layout>
    </>
  )
}

export interface ProductPageProps extends PageType {
  params: { id: IEquatable };
  header: Menu;
  product: Product;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  // console.log('Product getStaticProps', id);
  const product = await getProduct(id);
  // console.log('Product getStaticProps', product);
  const global = await getCachedGlobal();
  const header = global.menu.find(x => x.id === 'header'); // global.menu.header; ??
  const props = asStaticProps({ product, header, ...context });
  // console.log('Product getStaticProps', props);
  return {
    props,
    // revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths({ locales }) {
  const products = await getProducts();
  const ids = products ? products.map(x => x.id) : [];
  // console.log('Product getStaticPaths', locales, ids);
  const paths = asLocalizedPaths(ids, locales);
  // console.log('Product getStaticPaths', paths);
  return {
    paths,
    fallback: true,
  }
}
