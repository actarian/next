
import { Breadcrumb, Headline, Layout } from '@components';
import ContactFormRxJs from '@components/contact-form-rxjs/contact-form-rxjs';
import ContactForm from '@components/contact-form/contact-form';
import { asStaticProps } from '@core';
import { Fieldset } from '@geist-ui/core';
import { getLayout, getPage, getStaticPathsForSchema, PageProps } from '@models';
import { GetStaticPropsContext } from 'next/types';

export default function Contact({ layout, page, params }: PageProps) {
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Fieldset>
          <Fieldset.Title>{page.description}</Fieldset.Title>

          <ContactFormRxJs />

          <ContactForm />

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
