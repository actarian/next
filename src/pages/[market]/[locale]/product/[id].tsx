import { Breadcrumb, Headline, Layout } from '@components';
import { asStaticProps } from '@core';
import { Button, Card, Grid, Image, Note, Spacer, Text } from '@geist-ui/core';
import { ArrowRight, Heart, HeartFill } from '@geist-ui/icons';
import { useMounted, useWishlist } from '@hooks';
import { getLayout, getPage, getStaticPathsForSchema, PageProps } from '@models';
import { usePrice } from '@pipes';
import { GetStaticPropsContext } from 'next';

export default function ProductPage({ layout, page, params }: PageProps) {

  const { has, toggle } = useWishlist();
  const added = has(page);

  const mounted = useMounted();

  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <div style={{ position: 'relative' }}>
          <Headline title={page.title} abstract={page.abstract}></Headline>
          {mounted &&
            <Button auto type="abort" padding={0} style={{ position: 'absolute', top: '20px', right: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => toggle(page)}>{added ? <HeartFill /> : <Heart />}</Button>
          }
        </div>

        <Grid.Container gap={1.5}>
          <Grid sm={24} md={12} justify="center" alignItems="flex-start">

            <Card width="100%" type="dark">
              <Image alt={page.title} src={page.image} />
            </Card>

          </Grid>
          <Grid sm={24} md={12} justify="center" alignItems="flex-start">

            <Card width="100%">
              {page.description && <Text span>{<span className="wysiwyg" dangerouslySetInnerHTML={{ __html: page.description }} />}</Text>}
              <Card.Footer>
                <Button type="success" icon={<ArrowRight />} auto>Buy {usePrice(page.price)}</Button>
              </Card.Footer>
            </Card>

          </Grid>
        </Grid.Container>

        <Spacer h={.5} />

        <Note type="warning">This note details something important.</Note>

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
