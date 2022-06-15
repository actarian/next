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
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  options?: Array<INamedEntity>;
  validators?: FormValidator | FormValidator[];
  children?: IFormBuilderSchema;
}

export type IFormBuilderGroupSchema = { [key: string]: IFormBuilderControlSchema };

export type IFormBuilderArraySchema = IFormBuilderControlSchema[];

export type IFormBuilderGroupValues = { [key: string]: FormGroup | FormArray | FormControl };

export type IFormBuilderSchema = IFormBuilderGroupSchema | IFormBuilderArraySchema;

function mapGroup(children: IFormBuilderGroupSchema, schema?: IFormBuilderControlSchema): FormGroup {
  const controls: IFormBuilderGroupValues = {};
  Object.keys(children).forEach(key => {
    controls[key] = mapSchema({ name: key, ...children[key] });
  });
  const group = new FormGroup(controls, schema?.validators, schema);
  return group;
}

function mapArray(children: IFormBuilderControlSchema[], schema?: IFormBuilderControlSchema): FormArray {
  const controls = children.map(x => mapSchema(x));
  const array = new FormArray(controls, schema?.validators, schema);
  return array;
}

function mapControl(schema: IFormBuilderControlSchema): FormControl {
  return new FormControl(schema.value, schema.validators, schema);
}

function mapSchema(schema: IFormBuilderControlSchema): FormGroup | FormArray | FormControl {
  switch (schema.schema) {
    case 'group':
      return mapGroup(schema.children as IFormBuilderGroupSchema || {}, schema);
    case 'array':
      return mapArray(schema.children as IFormBuilderArraySchema || [], schema);
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
