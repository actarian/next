
import { FormControl, useControl } from '@forms';
import { Checkbox, Text } from '@geist-ui/core';
import { CheckboxEvent } from '@geist-ui/core/esm/checkbox';
import * as React from 'react';

type FieldCheckboxProps = {
  control: FormControl;
  name: string;
}

export function FieldCheckbox(props: FieldCheckboxProps) {

  const [state, setValue, setTouched] = useControl<string>(props.control);
  // console.log('FieldCheckbox', state, props.control.flags, props.control);
  // const [changes] = useObservable$<any>(() => props.control.changes$, props.control.value);
  // console.log('FieldCheckbox', 'changes', changes, props.control);

  const onDidChange = (event: CheckboxEvent) => {
    setValue(event.target.checked);
  }

  const [focus, setFocus] = React.useState(false);

  const onDidBlur = (_: React.FocusEvent<HTMLInputElement>) => {
    setTouched();
    setFocus(false);
  }

  const onDidFocus = (_: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  }

  return (
    state.flags.hidden ? (
      <input type="hidden" value={state.value || ''} />
    ) : (
      <>
        <Text type="secondary" small marginBottom='0.5em'>{props.name}</Text>

        <Checkbox
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          checked={state.value !== null}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          paddingTop='1em'
          paddingBottom='1em'>
          {props.name}
        </Checkbox>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{`error.${error.key}`}</Text>
        ))}
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
