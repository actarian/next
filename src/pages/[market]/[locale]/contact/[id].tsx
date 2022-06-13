
import { Breadcrumb, Headline, Layout } from '@components';
import { asStaticProps } from '@core';
import { useFormBuilder } from '@hooks/useFormBuilder/useFormBuilder';
import { getLayout, getPage, getStaticPathsForSchema, PageProps } from '@models';
import { Form, FormError, FormField, FormInput, FormLabel, FormReset, FormSubmit } from 'ariakit/form';
import { GetStaticPropsContext } from 'next/types';
import { Select, SelectItem } from 'src/@forms/select/select';

export default function Contact({ layout, page, params }: PageProps) {

  const { form, names, values, setValue, setFieldTouched, useSubmit } = useFormBuilder({
    name: '',
    fruit: '',
  });

  /*
  const form = useFormState({
    defaultValues: { name: '', fruit: '' }
  });

  form.useSubmit(() => {
    alert(JSON.stringify(form.values));
  });
  */

  useSubmit(() => {
    alert(JSON.stringify(values));
  });

  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Form className="form" state={form}>
          <div className="field">
            <FormLabel name={names.name}>Name</FormLabel>
            <FormInput name={names.name} required placeholder="John Doe" />
            <FormError className="error" name={names.name} />
          </div>
          <div className="field">
            <FormLabel name={names.fruit}>Favorite fruit</FormLabel>
            <FormField as={Select} name={names.fruit} value={values.fruit} required touchOnBlur={false}
              setValue={(value: string) => setValue(names.fruit, value)}
              onClose={() => setFieldTouched(names.fruit, true)}>
              <SelectItem value="">Select an item</SelectItem>
              <SelectItem value="Apple" />
              <SelectItem value="Banana" />
              <SelectItem value="Orange" />
            </FormField>
            <FormError name={names.fruit} className="error" />
          </div>
          <FormSubmit className="button">Submit</FormSubmit>
          <FormReset className="button secondary">Reset</FormReset>
        </Form>

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
