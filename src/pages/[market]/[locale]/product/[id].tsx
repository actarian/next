import { Breadcrumb, Headline, Layout } from '@components';
import { asStaticProps } from '@core';
import { Button, Card, Grid, Image, Input, Note, Spacer, Text } from '@geist-ui/core';
import { Heart, HeartFill, MinusCircle, PlusCircle, ShoppingCart } from '@geist-ui/icons';
import { useCart, useLabel, useMounted, useUI, useWishlist } from '@hooks';
import { getLayout, getPage, getStaticPathsForSchema, PageProps } from '@models';
import { usePrice } from '@pipes';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';
import styles from './product.module.scss';

export default function ProductPage({ layout, page, params }: PageProps) {

  const price = usePrice(page.price);

  const wishlist = useWishlist();
  const isAddedToWishlist = wishlist.has(page);

  const cart = useCart();
  const isAddedToCart = cart.has(page);

  const [qty, setQty] = useState(1);

  const reduceUI = useUI(state => state.reduce);
  function onSetDrawer(value?: string) {
    reduceUI(state => ({ drawer: value }));
  }

  function onSetQty(qty: number) {
    if (qty > 0) {
      setQty(qty);
    }
  }

  function onAddToCart() {
    cart.add(page, qty);
    // onSetDrawer('cart');
  }

  const label = useLabel();
  const mounted = useMounted();
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <div style={{ position: 'relative' }}>
          <Headline title={page.title} abstract={page.abstract}></Headline>
          {mounted &&
            <Button auto type="abort" padding={0} style={{
              position: 'absolute',
              top: '20px',
              right: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} onClick={() => wishlist.toggle(page)}>{isAddedToWishlist ? <HeartFill color="white" /> : <Heart />}</Button>
          }
        </div>

        <Grid.Container gap={1.5}>
          <Grid sm={24} md={12} justify="center" alignItems="flex-start">

            <Card width="100%">
              <Image alt={page.title} src={page.image} />
            </Card>

          </Grid>
          <Grid sm={24} md={12} justify="center" alignItems="flex-start">

            <Card width="100%">
              {page.description && <Text span>{<span className="wysiwyg" dangerouslySetInnerHTML={{ __html: page.description }} />}</Text>}
              <Card.Footer>
                <Button className={styles.remove} type="abort" padding="0" onClick={() => onSetQty(qty - 1)} >{<MinusCircle />}</Button>
                <Input className={styles.qty} placeholder="qty" value={qty.toString()} onChange={(value) => onSetQty(Number(value))} />
                <Button className={styles.add} type="abort" padding="0" onClick={() => onSetQty(qty + 1)} >{<PlusCircle />}</Button>
                {mounted &&
                  isAddedToCart ?
                  <Button type="success" icon={<ShoppingCart />} auto onClick={() => onSetDrawer('cart')}>Added to cart</Button> :
                  <Button type="success" icon={<ShoppingCart />} auto onClick={() => onAddToCart()}>Buy {price}</Button>
                }
              </Card.Footer>
            </Card>

          </Grid>
        </Grid.Container>

        <Spacer h={.5} />

        <Note type="warning">{label('product.note')}</Note>

      </Layout>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('product', id, market, locale);
  // console.log('Product getStaticProps', id);
  const props = asStaticProps({ ...context, layout, page });
  // console.log('Product getStaticProps', props);
  return {
    props,
    // revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('product');
  return {
    paths,
    fallback: true,
  };
}
