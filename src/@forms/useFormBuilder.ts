import { useObservable$ } from '@hooks/useObservable/useObservable';
import { DependencyList, useCallback, useMemo } from 'react';
import { map } from 'rxjs';
import { FormArray } from './forms/form-array';
import { FormControl } from './forms/form-control';
import { FormGroup } from './forms/form-group';
import { FormState } from './forms/types';
import { FormValidator } from './forms/validators/form-validator';
import { mapErrors_ } from './helpers/helpers';

export interface IFormBuilderControlSchema {
  schema: 'group' | 'array' | 'text' | 'select' | 'checkbox' | 'radio';
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disbled?: boolean;
  hidden?: boolean;
  options?: Array<{ name: string, value: any }>;
  validators?: FormValidator | FormValidator[];
  children?: IFormBuilderSchema;
}

export type IFormBuilderSchema = { [key: string]: IFormBuilderControlSchema } | IFormBuilderControlSchema[];

function mapControl(schema: IFormBuilderControlSchema): FormGroup | FormArray | FormControl {
  switch (schema.schema) {
    case 'group':
      const groupControls: { [key: string]: FormGroup | FormArray | FormControl } = {};
      const children = (schema.children as { [key: string]: IFormBuilderControlSchema }) || {}
      Object.keys(children).forEach(key => {
        groupControls[key] = mapControl(children[key]);
      });
      return new FormGroup(groupControls, schema.validators);
    case 'array':
      const arrayControls = (schema.children as IFormBuilderControlSchema[] || []).map(x => mapControl(x));
      return new FormArray(arrayControls, schema.validators);
    default:
      return new FormControl(schema.value, schema.validators, schema);
  }
}

function mapSchema(schema: IFormBuilderSchema | IFormBuilderControlSchema) {
  if (Array.isArray(schema)) {
    const controls = schema.map(x => mapControl(x));
    const array = new FormArray(controls);
    return array;
  } else {
    const controls: {
      [key: string]: FormGroup | FormArray | FormControl
    } = {};
    Object.keys(schema).forEach(key => {
      controls[key] = mapControl((schema as { [key: string]: IFormBuilderControlSchema })[key]);
    });
    const group = new FormGroup(controls);
    return group;
  }
}

export function useFormBuilder<T, U extends FormGroup | FormArray>(schemaLike: IFormBuilderSchema, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, FormGroup | FormArray] {
  const collection: U = useMemo<U>(() => {
    return mapSchema(schemaLike) as U;
  }, deps);
  const setValue = useCallback((value: any) => {
    collection.patch(value);
  }, deps);
  const setTouched = useCallback(() => {
    collection.touched = true;
  }, deps);
  const [state] = useObservable$<FormState<T>>(() => collection.changes$.pipe(
    map(value => ({ value: value, flags: collection.flags, errors: mapErrors_(collection.errors) })),
  ), { value: collection.value as T, flags: collection.flags, errors: mapErrors_(collection.errors) });
  return [state, setValue, setTouched, collection];
}
