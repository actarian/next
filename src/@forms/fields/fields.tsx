import { IFields } from '@forms/types';
import { lazy, Suspense } from 'react';

const FieldText = lazy(() => import('@forms/fields/field-text'));
const FieldSelect = lazy(() => import('@forms/fields/field-select'));
const FieldAutocomplete = lazy(() => import('@forms/fields/field-autocomplete'));
const FieldCheckbox = lazy(() => import('@forms/fields/field-checkbox'));
const FieldAccept = lazy(() => import('@forms/fields/field-accept'));

/*
  * Here we define the types of form fields.
*/
export type FieldType = 'text' | 'select' | 'autocomplete' | 'checkbox' | 'radio' | 'accept';

/*
  * Here we define the mapping of the form schemas to the relative components.
*/
export const FIELDS: IFields = {
  text: (control, uid) => <Suspense><FieldText control={control} uid={uid} key={uid} /></Suspense>,
  select: (control, uid) => <Suspense><FieldSelect control={control} uid={uid} key={uid} /></Suspense>,
  autocomplete: (control, uid) => <Suspense><FieldAutocomplete control={control} uid={uid} key={uid} /></Suspense>,
  checkbox: (control, uid) => <Suspense><FieldCheckbox control={control} uid={uid} key={uid} /></Suspense>,
  radio: (control, uid) => <Suspense><FieldCheckbox control={control} uid={uid} key={uid} /></Suspense>,
  accept: (control, uid) => <Suspense><FieldAccept control={control} uid={uid} key={uid} /></Suspense>,
};
