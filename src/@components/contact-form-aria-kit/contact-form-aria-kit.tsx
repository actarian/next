
import { FormBuilder, useFormBuilder } from '@hooks/useFormBuilder/useFormBuilder';

export default function ContactFormAriaKit() {

  const form = useFormBuilder({
    name: { schema: 'text', label: 'Full Name', placeholder: 'Jhon Doe', required: true },
    role: {
      schema: 'select', label: 'Role', options: [
        { name: 'Select a role', value: '' },
        { name: 'Designer', value: 'designer' },
        { name: 'FrontEnd', value: 'front-end' },
        { name: 'BackEnd', value: 'back-end' },
      ], required: true
    },
  });

  const { values, useSubmit } = form;

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
    <FormBuilder form={form} />
  )
}
