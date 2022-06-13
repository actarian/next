
import { className } from '@core/utils';
import { FieldGroup } from 'src/@forms/components/field-group';
import { Submit } from 'src/@forms/components/submit';
import { FormArray, FormControl, FormGroup, Validators } from 'src/@forms/forms';
import { useForm } from 'src/@forms/useForm';

export default function ContactFormRxJs() {

  const [form, setValue, setTouched, formGroup] = useForm<FormGroup>(() => new FormGroup({
    hidden: new FormControl('hidden', [], { hidden: true }), // Validators.PatternValidator(/^\d+$/),
    disabled: new FormControl('disabled', [], { disabled: true }), // Validators.PatternValidator(/^\d+$/),
    readonly: new FormControl('readonly', [], { readonly: true }), // Validators.PatternValidator(/^[a-zA-Z0-9]{3}$/),
    required: new FormControl(null, [Validators.RequiredValidator()]),
    group: new FormGroup({
      a: null,
      b: null,
    }),
    array: new FormArray([null, null]),
  }));

  console.log('ContactFormRxJs', form.value, form.flags, form.errors);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('ContactFormRxJs.onSubmit', formGroup.value);
    if (form.flags.valid) {
      //
    } else {
      setTouched();
    }
    alert(JSON.stringify({ valid: form.flags.valid, value: formGroup.value }));
  }

  return (
    <form className={className('form', form.flags)} onSubmit={onSubmit}>
      <FieldGroup group={formGroup} />
      <Submit label="Submit" />
    </form>
  )
}
