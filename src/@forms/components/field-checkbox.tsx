
import { FormControl, useControl } from '@forms';
import { Checkbox, Text } from '@geist-ui/core';
import { CheckboxEvent } from '@geist-ui/core/esm/checkbox';
import { useLabel } from '@hooks';
import { FocusEvent, useState } from 'react';

type FieldCheckboxProps = {
  control: FormControl;
  uid?: number | null | undefined;
}

export function FieldCheckbox(props: FieldCheckboxProps) {
  const label = useLabel();

  const uniqueName = `${props.control.name}-${props.uid}`;

  const [state, setValue, setTouched] = useControl<string>(props.control);
  // console.log('FieldCheckbox', state, props.control.flags, props.control);
  // const [changes] = useObservable$<any>(() => props.control.changes$, props.control.value);
  // console.log('FieldCheckbox', 'changes', changes, props.control);

  const onDidChange = (event: CheckboxEvent) => {
    setValue(event.target.checked);
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
        {false &&
          <Text type="secondary" small marginBottom='0.5em'>
            {label(props.control.label)}
          </Text>
        }

        <Checkbox
          id={uniqueName}
          name={uniqueName}
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          checked={state.value !== null}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          paddingTop='1em'
          paddingBottom='1em'>
          {label(props.control.label)}
        </Checkbox>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
