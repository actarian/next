
import { Breadcrumb, ContactForm, Headline, IContactForm, Layout } from '@components';
import { asStaticProps } from '@core';
import { Fieldset, Text } from '@geist-ui/core';
import { getCountries, getLayout, getListByKeys, getPage, getProvinces, getRegions, getStaticPathsForSchema, PageProps } from '@models';
import { GetStaticPropsContext } from 'next/types';
import { useState } from 'react';

export default function Contact({ layout, page, data, params }: ContactProps) {

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (value: any) => {
    setSubmitted(true);
  }

  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Fieldset style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {submitted ?
            <>
              <Fieldset.Title><Text h2>Thanks for being awesome!</Text></Fieldset.Title>
              <Fieldset.Title>
                <Text h4>
                  <p>We have received your message and would like to thank you for writing to us.</p>
                  <p>If your inquiry is urgent, please use the telephone number listed below to talk to one of our staff members.</p>
                  <p>Otherwise, we will reply by email as soon as possible.</p>
                  <p>Talk to you soon, [Your Company]</p>
                </Text>
              </Fieldset.Title>
            </> :
            <>
              <Fieldset.Title><Text h2 style={{ maxWidth: '740px' }}>{page.description}</Text></Fieldset.Title>
              <ContactForm data={data} onSubmit={onSubmit} />
            </>}
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
  const lists = await getListByKeys(['magazines', 'occupations'], locale);
  const countries = await getCountries(locale);
  const provinces = await getProvinces(locale);
  const regions = await getRegions(locale);
  const data = { ...lists, countries, regions, provinces };
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
