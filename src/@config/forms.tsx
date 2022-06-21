import { FormControl } from '@forms';
import { FieldAccept } from '@forms/components/field-accept';
import { FieldAutocomplete } from '@forms/components/field-autocomplete';
import { FieldCheckbox } from '@forms/components/field-checkbox';
import { FieldSelect } from '@forms/components/field-select';
import { FieldText } from '@forms/components/field-text';

/*
  * Here we define the types of form controls.
*/
export type IControlSchema = 'text' | 'select' | 'autocomplete' | 'checkbox' | 'radio' | 'accept';

/*
  * Here we define the mapping of the form schemas to the relative components.
*/
export const CONTROLS: IControls = {
  text: (control, uid) => <FieldText control={control} uid={uid} key={uid} />,
  select: (control, uid) => <FieldSelect control={control} uid={uid} key={uid} />,
  autocomplete: (control, uid) => <FieldAutocomplete control={control} uid={uid} key={uid} />,
  checkbox: (control, uid) => <FieldCheckbox control={control} uid={uid} key={uid} />,
  radio: (control, uid) => <FieldCheckbox control={control} uid={uid} key={uid} />,
  accept: (control, uid) => <FieldAccept control={control} uid={uid} key={uid} />,
};

export type IControlParam = { uid: number, control: FormControl };

export type IControls = {
  [key in IControlSchema]: (control: FormControl, uid?: number) => JSX.Element;
}
