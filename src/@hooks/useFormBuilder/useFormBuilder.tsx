import { FormState, FormStateProps, useFormState } from 'ariakit';

export declare type AnyObject = Record<keyof any, any>;

export type IFormValue = string;

export type IFormGroup = {
  [key: string]: IFormGroup | IFormArray | IFormValue;
}

export type IFormArray = Array<IFormGroup> | Array<IFormArray> | Array<IFormValue>;

export type IDefaultValues = IFormGroup | IFormArray;

export interface IFormBuilder extends FormState {
  form: FormState;
}

// : { [key: string]: string }
// export function useFormBuilder(defaultValues: any):IFormBuilder {
export function useFormBuilder(defaultValues: { [key: string]: string }) {

  const props: FormStateProps = {
    defaultValues,
  };

  const form = useFormState(props);

  return { ...form, form };
}

export function FormBuilder({ state }: { state: IFormBuilder }) {
  // console.log('LayoutProvider.context', context);
  return (
    <>
    </>
  );
};
