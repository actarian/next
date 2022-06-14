
import { className } from '@core/utils';
import { FormControl, useControl } from '@forms';
import { Input, Text } from '@geist-ui/core';
import { useLabel } from '@hooks';
import * as React from 'react';

type FieldTextProps = {
  control: FormControl;
  name: string;
}

export function FieldText(props: FieldTextProps) {
  const label = useLabel();

  const [state, setValue, setTouched] = useControl<string>(props.control);
  // console.log('FieldText', state, props.control.flags, props.control);
  // const [changes] = useObservable$<any>(() => props.control.changes$, props.control.value);
  // console.log('FieldText', 'changes', changes, props.control);

  const onDidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('FieldText', event.target.value);
    setValue(event.target.value);
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
        <Input
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          placeholder={props.name}
          value={state.value || ''}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled}
          readOnly={state.flags.readonly}
          width="100%">
          {label(props.control.label)}
        </Input>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}

        {false &&
          <div className={className('field', state.flags, { value: state.value != null && state.value != '', focus })}>
            <div className="field__head"></div>
            <div className="field__control">
              <input placeholder={props.name} value={state.value || ''} onChange={onDidChange} onBlur={onDidBlur} onFocus={onDidFocus} disabled={state.flags.disabled} readOnly={state.flags.readonly} />
              <div className="field__label">{props.name}</div>
              {state.flags.touched && state.errors.map(error => (
                <div key={error.key} className="field__error">{error.key}</div>
              ))}
            </div>
            <div className="field__head"></div>
          </div>
        }
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
