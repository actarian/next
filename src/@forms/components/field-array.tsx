
import { FormAbstract, FormArray, FormGroup } from '../forms';
import { FieldGroup } from './field-group';
import { FieldText } from './field-text';

type FieldArrayProps = {
  array: FormArray;
  label?: string;
  uid?: number;
}

export function FieldArray(props: FieldArrayProps) {
  let uid = props.uid || 0;
  return (
    <>
      {
        props.array.controls.map((control: FormAbstract, i: number) => {
          uid++;
          if (control instanceof FormGroup) {
            return <FieldGroup key={uid} group={control} uid={uid} />
          } else if (control instanceof FormArray) {
            return <FieldArray key={uid} array={control} uid={uid} />
          } else {
            return <FieldText key={uid} name={uid.toString()} control={control} />
          }
        })
      }
    </>
  );
}
