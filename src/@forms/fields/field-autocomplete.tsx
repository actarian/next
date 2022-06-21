
import type { IEquatable } from '@core';
import { FormControl } from '@forms';
import { AutoComplete, Text } from '@geist-ui/core';
import { useControl, useLabel } from '@hooks';
import { FocusEvent, useState } from 'react';

type FieldAutocompleteProps = {
  control: FormControl;
  uid?: number | null | undefined;
}

export default function FieldAutocomplete(props: FieldAutocompleteProps) {
  const label = useLabel();

  const uniqueName = `${props.control.name}-${props.uid}`;

  const [state, setValue, setTouched] = useControl<string>(props.control);

  const onDidChange = (value: string | string[]) => {
    // console.log('FieldAutocomplete', event.target.value);
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

  const [options, setOptions] = useState<any[]>();

  const onSearch = (query: string) => {
    const options = props.control.options;
    if (!query || !options) {
      return setOptions([]);
    }
    query = query.toLowerCase();
    const results = options.filter(x => x.name.toString().toLowerCase().includes(query)).map(x => ({
      value: x.name,
      label: x.name,
    }));
    setOptions(results)
  }

  const onSelect = (value: string) => {
    const option = props.control.options?.find(x => x.name === value);
    const id = option ? option.id.toString() : null;
    if (id) {
      onDidChange(id);
    }
  }

  const option = state.value && options ? options.find(x => x.id === state.value) : undefined;
  const value = option ? option.name.toString() : undefined;

  // const initialValue = state.value ? state.value.toString() : undefined;

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

        <AutoComplete
          id={uniqueName}
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          placeholder={label(props.control.placeholder || props.control.label || '')}
          value={value}
          onSelect={onSelect}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          width="100%"
          disableMatchWidth
          style={{ minWidth: '0' }}
          clearable={true}
          options={options}
          onSearch={onSearch}
        />

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
