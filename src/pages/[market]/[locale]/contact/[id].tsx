
import { Breadcrumb, Headline, Layout } from '@components';
import ContactFormAriaKit from '@components/contact-form-aria-kit/contact-form-aria-kit';
import ContactFormRxJs from '@components/contact-form-rxjs/contact-form-rxjs';
import { asStaticProps } from '@core';
import { Fieldset, Text } from '@geist-ui/core';
import { getLayout, getPage, getStaticPathsForSchema, PageProps } from '@models';
import { GetStaticPropsContext } from 'next/types';

export default function Contact({ layout, page, params }: PageProps) {
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Fieldset.Title><Text h2 style={{ maxWidth: '740px' }}>{page.description}</Text></Fieldset.Title>

          <ContactFormRxJs />

          <ContactFormAriaKit />

        </Fieldset>

      </Layout>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('contact', id, market, locale);
  const props = asStaticProps({ ...context, layout, page });
  // console.log('About getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('contact');
  return {
    paths,
    fallback: true,
  };
}
