
import { className } from '@core/utils';
import { Input, Text } from '@geist-ui/core';
import * as React from 'react';
import { FormControl } from '../forms';
import { useControl } from '../useControl';

type FieldTextProps = {
  control: FormControl;
  name: string;
}

export function FieldText(props: FieldTextProps) {

  const [control, setValue, setTouched] = useControl<string>(props.control);
  // console.log('FieldText', control, props.control.flags, props.control);
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
    control.flags.hidden ? (
      <input type="hidden" value={control.value || ''} />
    ) : (
      <>
        <Input
          type={(control.flags.invalid && control.flags.touched) ? 'error' : 'default'}
          placeholder={props.name}
          value={control.value || ''}
          onChange={onDidChange}
          onBlur={onDidBlur}
          onFocus={onDidFocus}
          disabled={control.flags.disabled}
          readOnly={control.flags.readonly}>
          {props.name}
        </Input>

        {control.flags.touched && control.errors.map(error => (
          <Text key={error.key} type="error" small>{`error.${error.key}`}</Text>
        ))}

        <div className={className('field', control.flags, { value: control.value != null && control.value != '', focus })}>
          <div className="field__head"></div>
          <div className="field__control">
            <input placeholder={props.name} value={control.value || ''} onChange={onDidChange} onBlur={onDidBlur} onFocus={onDidFocus} disabled={control.flags.disabled} readOnly={control.flags.readonly} />
            <div className="field__label">{props.name}</div>
            {control.flags.touched && control.errors.map(error => (
              <div key={error.key} className="field__error">{error.key}</div>
            ))}
          </div>
          <div className="field__head"></div>
        </div>
      </>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
