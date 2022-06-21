import { className } from '@core/utils';
import { FormControl } from '@forms';
import { Input, Text } from '@geist-ui/core';
import { useControl, useLabel } from '@hooks';
import { ChangeEvent, FocusEvent, useState } from 'react';

type FieldTextProps = {
  control: FormControl;
  uid?: number | null | undefined;
}

export default function FieldText(props: FieldTextProps) {
  const label = useLabel();

  const uniqueName = `${props.control.name}-${props.uid}`;

  const [state, setValue, setTouched] = useControl<string>(props.control);

  const onDidChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('FieldText', event.target.value);
    setValue(event.target.value);
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
        <Input
          id={uniqueName}
          name={uniqueName}
          type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'}
          placeholder={label(props.control.placeholder || props.control.label || '')}
          value={state.value || ''}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={state.flags.disabled}
          readOnly={state.flags.readonly}
          width="100%">
          {props.control.label && label(props.control.label)}
        </Input>

        {state.flags.touched && state.errors.map(error => (
          <Text key={error.key} type="error" small>{label(`error.${error.key}`)}</Text>
        ))}

        {false &&
          <div className={className('field', state.flags, { value: state.value != null && state.value != '', focus })}>
            <div className="field__head"></div>
            <div className="field__control">
              <input placeholder={props.control.placeholder || props.control.label} value={state.value || ''} onChange={onDidChange} onBlur={onDidBlur} onFocus={onDidFocus} disabled={state.flags.disabled} readOnly={state.flags.readonly} />
              <div className="field__label">{props.control.label}</div>
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
