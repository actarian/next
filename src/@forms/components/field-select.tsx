
import type { IEquatable } from '@core';
import { FormControl, useControl } from '@forms';
import { Select, Text } from '@geist-ui/core';
import * as React from 'react';

type FieldSelectProps = {
  control: FormControl;
  name: string;
}

export function FieldSelect(props: FieldSelectProps) {

  const [state, setValue, setTouched] = useControl<string>(props.control);
  // console.log('FieldSelect', state, props.control.flags, props.control);
  // const [changes] = useObservable$<any>(() => props.control.changes$, props.control.value);
  // console.log('FieldSelect', 'changes', changes, props.control);

  const onDidChange = (value: string | string[]) => {
    // console.log('FieldSelect', event.target.value);
    let id: IEquatable | IEquatable[] | null = null;
    function mapValue(value: string) {
      const option = props.control.options?.find(x => x.id.toString() === value);
      return option ? option.id : null;
    }
    if (Array.isArray(value)) {
      id = value.map(x => mapValue(x)).filter(x => x !== null) as IEquatable[];
    } else {
      id = mapValue(value);
    }
    setValue(id);
    // props.control.value = event.target.value;
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
        <Select
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          placeholder={props.name}
          value={state.value ? state.value.toString() : undefined}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          width="100%"
          disableMatchWidth
          style={{ minWidth: '0' }}>
          {props.control.options && props.control.options.map((option, i) => (
            <Select.Option key={i} value={option.id.toString()}>{option.name}</Select.Option>
          ))}
        </Select>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{`error.${error.key}`}</Text>
        ))}
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
