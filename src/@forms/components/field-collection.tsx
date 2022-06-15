
import { CONTROLS, IControlSchema } from '@config/forms';
import { FormAbstract, FormArray, FormGroup } from '@forms';
import { Grid } from '@geist-ui/core';

type FieldCollectionProps = {
  collection: FormGroup | FormArray;
  uid?: number | null | undefined;
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
      return <FieldCollection collection={control} uid={uid} key={uid} />
    } else {
      if (control.schema in CONTROLS) {
        return CONTROLS[control.schema as IControlSchema](control, uid);
      } else {
        return CONTROLS.text(control, uid);
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
          return <Grid key={++uid} xs={24} sm={['checkbox', 'accept'].includes(control.schema) ? 24 : 12} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            {resolveField(item)}
          </Grid>
        }
      })}
    </>
  );
}
