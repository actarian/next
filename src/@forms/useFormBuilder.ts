import { IControlSchema } from '@config/forms';
import { INamedEntity } from '@core';
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
  schema: 'group' | 'array' | IControlSchema;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disbled?: boolean;
  hidden?: boolean;
  options?: Array<INamedEntity>;
  validators?: FormValidator | FormValidator[];
  children?: IFormBuilderSchema;
}

export type IFormBuilderGroupSchema = { [key: string]: IFormBuilderControlSchema };

export type IFormBuilderArraySchema = IFormBuilderControlSchema[];

export type IFormBuilderGroupValues = { [key: string]: FormGroup | FormArray | FormControl };

export type IFormBuilderSchema = IFormBuilderGroupSchema | IFormBuilderArraySchema;

function mapGroup(schema: IFormBuilderGroupSchema): FormGroup {
  const controls: IFormBuilderGroupValues = {};
  Object.keys(schema).forEach(key => {
    controls[key] = mapSchema(schema[key]);
  });
  const group = new FormGroup(controls);
  return group;
}

function mapArray(schema: IFormBuilderControlSchema[]): FormArray {
  const controls = schema.map(x => mapSchema(x));
  const array = new FormArray(controls);
  return array;
}

function mapControl(schema: IFormBuilderControlSchema): FormControl {
  return new FormControl(schema.value, schema.validators, schema);
}

function mapSchema(schema: IFormBuilderControlSchema): FormGroup | FormArray | FormControl {
  switch (schema.schema) {
    case 'group':
      return mapGroup(schema.children as IFormBuilderGroupSchema || {});
    case 'array':
      return mapArray(schema.children as IFormBuilderArraySchema || []);
    default:
      return mapControl(schema);
  }
}

export function useFormBuilder<T, U extends (FormGroup | FormArray)>(schema: IFormBuilderSchema, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, () => void, U] {
  const collection: U = useMemo<U>(() => {
    if (Array.isArray(schema)) {
      return mapArray(schema) as U;
    } else {
      return mapGroup(schema) as U;
    }
    // return mapSchema(schema) as U;
  }, deps);
  const setValue = useCallback((value: any) => {
    collection.patch(value);
  }, deps);
  const setTouched = useCallback(() => {
    collection.touched = true;
  }, deps);
  const reset = useCallback(() => {
    collection.reset();
  }, deps);
  const [state] = useObservable$<FormState<T>>(() => collection.changes$.pipe(
    map(value => ({ value: value, flags: collection.flags, errors: mapErrors_(collection.errors) })),
  ), { value: collection.value as T, flags: collection.flags, errors: mapErrors_(collection.errors) });
  return [state, setValue, setTouched, reset, collection];
}
