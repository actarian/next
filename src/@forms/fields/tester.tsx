import { isDevelopment } from '@core';
import { FormState } from '@forms';
import { Button, Fieldset } from '@geist-ui/core';
import { useLabel } from '@hooks';

type TesterProps = {
  form: FormState<any>;
  onTest: () => void;
  onReset: () => void;
}

export default function Tester(props: TesterProps) {
  if (!isDevelopment) {
    return null;
  }

  const label = useLabel();

  const json = JSON.stringify(props.form.value, null, 2);

  return (
    <Fieldset>
      <Fieldset.Title>Form Tester</Fieldset.Title>
      <Fieldset.Subtitle>this component is visible only during development.</Fieldset.Subtitle>
      <code style={{ margin: '20px 0' }}>{json}</code>
      <Fieldset.Footer>
        <Button auto scale={1 / 3} font="12px" onClick={props.onReset}>{label('form.reset')}</Button>
        <Button auto scale={1 / 3} font="12px" type="success" onClick={props.onTest}>{label('form.test')}</Button>
      </Fieldset.Footer>
    </Fieldset>
  );
}
