
import { FormControl } from '@forms';
import { Radio, Text } from '@geist-ui/core';
import { useControl, useLabel } from '@hooks';
import { FocusEvent, useState } from 'react';

type FieldAcceptProps = {
  control: FormControl;
  uid?: number | null | undefined;
}

export function FieldAccept(props: FieldAcceptProps) {
  const label = useLabel();

  const uniqueName = `${props.control.name}-${props.uid}`;

  const [state, setValue, setTouched] = useControl<string>(props.control);

  const onSelect = (value: boolean) => {
    setValue(value);
  }

  const [focus, setFocus] = useState(false);

  const onDidBlur = (_: FocusEvent<HTMLInputElement>) => {
    setTouched();
    setFocus(false);
  }

  const onDidFocus = (_: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  }

  return (
    state.flags.hidden ? (
      <input type="hidden" value={state.value || ''} />
    ) : (
      <>
        {/* <Radio.Group useRow width='100%' style={{ justifyContent: 'space-around' }} */}
        <Radio.Group useRow
          value={state.value?.toString() || undefined} onChange={(value) => onSelect(value === 'true')}>
          <Radio
            name={uniqueName}
            id={`${uniqueName}_true`}
            value={'true'}
            type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
            onBlur={onDidBlur}
            onFocus={onDidFocus}
            disabled={state.flags.disabled || state.flags.readonly}
            paddingTop='1em'
            paddingBottom='1em'>
            {label('form.accept.true')}
          </Radio>

          <Radio
            name={uniqueName}
            id={`${uniqueName}_false`}
            value={'false'}
            type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
            onBlur={onDidBlur}
            onFocus={onDidFocus}
            disabled={state.flags.disabled || state.flags.readonly}
            paddingTop='1em'
            paddingBottom='1em'>
            {label('form.accept.false')}
          </Radio>
        </Radio.Group>

        {props.control.label &&
          <Text type="secondary" small marginBottom='0.5em'>
            {label(props.control.label)}
          </Text>
        }

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}
      </>
    )
  );
}
