
import type { IEquatable } from '@core';
import { FormControl } from '@forms';
import { Select, Text } from '@geist-ui/core';
import { useControl, useLabel } from '@hooks';
import { FocusEvent, useState } from 'react';

type FieldSelectProps = {
  control: FormControl;
  uid?: number | null | undefined;
}

export function FieldSelect(props: FieldSelectProps) {
  const label = useLabel();

  const uniqueName = `${props.control.name}-${props.uid}`;

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
        {props.control.label &&
          <Text type="secondary" small marginBottom='0.5em'>
            {label(props.control.label)}
          </Text>
        }

        <Select
          id={uniqueName}
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          placeholder={label(props.control.placeholder || props.control.label || '')}
          value={state.value ? state.value.toString() : undefined}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          width="100%"
          disableMatchWidth
          style={{ minWidth: '0' }}>
          {props.control.options && props.control.options.map((option, i) => (
            <Select.Option key={i} value={option.id.toString()}>{option.name as string}</Select.Option>
          ))}
        </Select>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
