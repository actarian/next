import { FormState, FormStateProps, useFormState } from 'ariakit';
import { Form, FormError, FormField, FormInput, FormLabel, FormReset, FormSubmit } from 'ariakit/form';
import { Select, SelectItem } from 'src/@forms/select/select';

export declare type AnyObject = Record<keyof any, any>;

export type IFormValue = string;

export type IFormGroup = {
  [key: string]: IFormGroup | IFormArray | IFormValue;
}

export type IFormArray = Array<IFormGroup> | Array<IFormArray> | Array<IFormValue>;

export type IDefaultValues = IFormGroup | IFormArray;

export interface IControlSchemaLike {
  schema: 'text' | 'select';
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ name: string, value: any }>;
}

export interface IFormSchemaLike {
  [key: string]: IControlSchemaLike;
}

export interface IControlSchema extends IControlSchemaLike {
  name: any; // { name: StringLike | ({ [key: number]: StringLike; } & StringLike) | Names<any>;
}

export type IFormSchema = Array<IControlSchema>;

export interface IFormBuilder extends FormState {
  schema: IFormSchema;
}

// : { [key: string]: string }
// export function useFormBuilder(defaultValues: any):IFormBuilder {
export function useFormBuilder(schemaLike: IFormSchemaLike): IFormBuilder {

  const defaultValues: { [key: string]: string } = {};
  Object.keys(schemaLike).forEach(key => {
    defaultValues[key] = schemaLike[key].value || '';
  });

  const props: FormStateProps = {
    defaultValues,
  };

  const form = useFormState(props);

  const { names } = form;

  const schema: IFormSchema = Object.keys(schemaLike).map(key => ({
    ...schemaLike[key],
    name: names[key],
  }));

  return { ...form, schema };
}

export function FormBuilder({ form }: { form: IFormBuilder }) {
  // console.log('LayoutProvider.context', context);

  const { values, names, setValue, setFieldTouched, schema } = form;

  /*
  validate: () => Promise<boolean>;
  useValidate: (callback: Callback) => void;
  */

  function renderSchema(key: string, control: IControlSchema) {
    // console.log(control.schema);
    switch (control.schema) {
      case 'text':
        return <FormInput name={key} placeholder={control.placeholder} required={control.required} />
        break;
      case 'select':
        return <FormField name={key} placeholder={control.placeholder} value={control.options?.find(x => x.value === values[key])?.name} required={control.required}
          as={Select}
          touchOnBlur={false}
          setValue={(value: string) => setValue(key, value)}
          onClose={() => setFieldTouched(key, true)}>
          {control.options && control.options.map((option, i) =>
            <SelectItem key={i} value={option.value}>{option.name}</SelectItem>
          )}
        </FormField>
        break;
    }
  }

  return (

    <Form className="form" state={form}>
      {schema.map((control, i) =>
        <div className="aria-field" key={i}>
          <FormLabel name={control.name}>{control.label}</FormLabel>
          {renderSchema(control.name, control)}
          <FormError className="error" name={control.name} />
        </div>
      )}
      <FormSubmit className="button">Submit</FormSubmit>
      <FormReset className="button secondary">Reset</FormReset>
    </Form>

  );
};
