
import { FormArray, FormGroup } from '../forms';
import { FieldArray } from './field-array';
import { FieldText } from './field-text';

type FieldGroupProps = {
  group: FormGroup;
  label?: string;
  uid?: number;
}

export function FieldGroup(props: FieldGroupProps) {
  let uid = props.uid || 0;
  return (
    <>
      {
        Object.keys(props.group.controls).map(key => {
          uid++;
          const control = props.group.controls[key];
          if (control instanceof FormGroup) {
            return <FieldGroup key={uid} group={control} uid={uid} />
          } else if (control instanceof FormArray) {
            return <FieldArray key={uid} array={control} uid={uid} />
          } else {
            return <FieldText key={uid} name={key} control={control} />
          }
        })
      }
    </>
  );
}
