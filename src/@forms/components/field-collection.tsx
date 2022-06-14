
import { FormAbstract, FormArray, FormGroup } from '@forms';
import { FieldText } from '@forms/components/field-text';
import { Grid } from '@geist-ui/core';
import { FieldCheckbox } from './field-checkbox';
import { FieldSelect } from './field-select';

type FieldCollectionProps = {
  collection: FormGroup | FormArray;
  label?: string;
  uid?: number;
}

export function FieldCollection(props: FieldCollectionProps) {
  let uid = props.uid || 0;

  const controls = (props.collection instanceof FormGroup) ?
    Object.keys(props.collection.controls).map(key => {
      return { key, control: (props.collection as FormGroup).controls[key] };
    }) :
    props.collection.controls.map((control, i) => {
      return { key: i, control };
    });
  ;

  function resolveField(item: { control: FormAbstract, key: string | number }) {
    const { control, key } = item;
    ++uid;
    if (control instanceof FormGroup || control instanceof FormArray) {
      return <FieldCollection key={uid} collection={control} uid={uid} />
    } else {
      switch (control.schema) {
        case 'select':
          return <FieldSelect key={uid} name={key.toString()} control={control} />
        case 'checkbox':
          return <FieldCheckbox key={uid} name={key.toString()} control={control} />
        default:
          return <FieldText key={uid} name={key.toString()} control={control} />
      }
    }
  }

  return (
    <>
      {controls.length && controls.map(item => {
        const control = item.control;
        if (!control) {
          return;
        }
        if (control instanceof FormGroup || control instanceof FormArray || control.flags.hidden) {
          return resolveField(item);
        } else {
          return <Grid key={++uid} xs={24} sm={control.schema === 'checkbox' ? 24 : 12} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            {resolveField(item)}
          </Grid>
        }
      })}
    </>
  );
}
