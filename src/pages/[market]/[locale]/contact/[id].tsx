
import { Breadcrumb, Headline, Layout } from '@components';
import ContactFormAriaKit from '@components/contact-form-aria-kit/contact-form-aria-kit';
import ContactFormRxJs, { IContactForm } from '@components/contact-form-rxjs/contact-form-rxjs';
import { asStaticProps } from '@core';
import { Fieldset, Text } from '@geist-ui/core';
import { getCountries, getLayout, getOccupations, getPage, getProvinces, getRegions, getStaticPathsForSchema, PageProps } from '@models';
import { getMagazines } from '@models/magazine/magazine.service';
import { GetStaticPropsContext } from 'next/types';

export default function Contact({ layout, page, data, params }: ContactProps) {
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Fieldset.Title><Text h2 style={{ maxWidth: '740px' }}>{page.description}</Text></Fieldset.Title>

          <ContactFormRxJs data={data} />

          <ContactFormAriaKit />

        </Fieldset>

      </Layout>
    </>
  )
}

export interface ContactProps extends PageProps {
  data: IContactForm;
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('contact', id, market, locale);
  const countries = await getCountries(locale);
  const magazines = await getMagazines(locale);
  const occupations = await getOccupations(locale);
  const provinces = await getProvinces(locale);
  const regions = await getRegions(locale);
  const data = { countries, magazines, occupations, provinces, regions };
  const props = asStaticProps({ ...context, layout, page, data });
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
