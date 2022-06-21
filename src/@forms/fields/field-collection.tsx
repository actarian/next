
import { FormAbstract, FormArray, FormGroup } from '@forms';
import { Divider, Grid } from '@geist-ui/core';
import { useLabel } from '@hooks';
import { FIELDS, FieldType } from './fields';

type FieldCollectionProps = {
  collection: FormGroup | FormArray;
  uid?: number | null | undefined;
}

export default function FieldCollection(props: FieldCollectionProps) {
  const label = useLabel();

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
      if (control.schema in FIELDS) {
        return FIELDS[control.schema as FieldType](control, uid);
      } else {
        return FIELDS.text(control, uid);
      }
    }
  }

  return (
    <>
      {props.collection.label &&
        <Grid key={++uid} xs={24}>
          <Divider h={1} type="success" width="100%">{label(props.collection.label)}</Divider>
        </Grid>
      }

      {controls.length && controls.map(item => {
        const control = item.control;
        if (!control) {
          return;
        }
        if (control instanceof FormGroup || control instanceof FormArray || control.state.hidden) {
          // console.log(control);
          if (!control.state.hidden) {
            return resolveField(item);
          }
        } else {
          return <Grid key={++uid} xs={24} sm={['checkbox', 'accept'].includes(control.schema) ? 24 : 12} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            {resolveField(item)}
          </Grid>
        }
      })}
    </>
  );
}
