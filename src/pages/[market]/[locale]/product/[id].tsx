import Breadcrumb from '@components/breadcrumb/breadcrumb';
import Headline from '@components/headline/headline';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Button, Card, Grid, Image, Note, Spacer, Text } from '@geist-ui/core';
import { ArrowRight } from '@geist-ui/icons';
import { PageLayout, PageParams } from '@models/page/page';
import { store } from '@models/store';
import { P } from '@pipes/pipes';
import { PageType } from 'types';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function ProductPage({ page, params }: ProductPageProps) {
  /*
  const router = useRouter()
  const { id } = router.query;
  */
  if (!page) {
    return;
  }
  // console.log('Product', page.description);
  return (
    <>
      <Layout page={page}>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Grid.Container gap={1.5}>
          <Grid xs={12} justify="center" alignItems="flex-start">

            <Card width="100%" type="dark">
              <Image alt={page.title} src={page.image} />
            </Card>

          </Grid>
          <Grid xs={12} justify="center" alignItems="flex-start">

            <Card width="100%">
              {page.description && <Text span>{<span className="wysiwyg" dangerouslySetInnerHTML={{ __html: page.description }} />}</Text>}
              <Card.Footer>
                <Button type="success" icon={<ArrowRight />} auto>Buy {P(page.price, P.price())}</Button>
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

export interface ProductPageProps extends PageType {
  page: PageLayout;
  params: PageParams;
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const page = await store.getPageLayout('product', id, market, locale);
  // console.log('Product getStaticProps', id);
  const props = asStaticProps({ ...context, page });
  // console.log('Product getStaticProps', props);
  return {
    props,
    // revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths() {
  const paths = await store.getStaticPathsForSchema('product');
  return {
    paths,
    fallback: true,
  };
}
