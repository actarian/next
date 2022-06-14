
import { IEquatable } from '@core';
import { className } from '@core/utils';
import { FormControl, FormGroup, useForm, Validators } from '@forms';
import { FieldCollection } from '@forms/components/field-collection';
import { Submit } from '@forms/components/submit';
import { useFormBuilder } from '@forms/useFormBuilder';
import { Grid } from '@geist-ui/core';
import { useApiGet } from '@hooks';

export default function ContactFormRxJs() {

  const [form, setValue, setTouched, formGroup] = useFormBuilder<any, FormGroup>({
    magazine: { schema: 'select', label: 'contact.magazine', validators: Validators.RequiredValidator() },
    //
    firstName: { schema: 'text', label: 'contact.firstName', validators: Validators.RequiredValidator() },
    lastName: { schema: 'text', label: 'contact.lastName', validators: Validators.RequiredValidator() },
    email: { schema: 'text', label: 'contact.email', validators: [Validators.RequiredValidator(), Validators.EmailValidator()] },
    telephone: { schema: 'text', label: 'contact.telephone', validators: Validators.RequiredValidator() },
    occupation: { schema: 'select', label: 'contact.occupation', validators: Validators.RequiredValidator() },
    country: { schema: 'select', label: 'contact.country', validators: Validators.RequiredValidator() },
    region: { schema: 'select', label: 'contact.region', validators: Validators.RequiredValidator() },
    //
    printedCopy: { schema: 'checkbox', label: 'contact.printedCopy' },
    //
    shippingInfo: {
      schema: 'group', children: {
        city: { schema: 'text', label: 'contact.city' },
        province: { schema: 'select', label: 'contact.province' },
        zipCode: { schema: 'text', label: 'contact.zipCode' },
        address: { schema: 'text', label: 'contact.address' },
        streetNumber: { schema: 'text', label: 'contact.streetNumber' },
        phoneNumber: { schema: 'text', label: 'contact.phoneNumber' },
      }
    },
    //
    privacy: { schema: 'checkbox', label: 'contact.privacy', validators: Validators.RequiredTrueValidator() },
    newsletter: { schema: 'checkbox', label: 'contact.newsletter', validators: Validators.RequiredTrueValidator() },
    commercial: { schema: 'checkbox', label: 'contact.commercial', validators: Validators.RequiredTrueValidator() },
    promotion: { schema: 'checkbox', label: 'contact.promotion', validators: Validators.RequiredTrueValidator() },
    //
    checkRequest: { schema: 'text', value: 'window.antiforgery', hidden: true },
    checkField: { schema: 'text', hidden: true },
    //
  });

  if (false) {
    const [form, setValue, setTouched, formGroup] = useForm<any>(() => new FormGroup({
      magazine: new FormControl(null, [Validators.RequiredValidator()], { schema: 'select' }),
      //
      firstName: new FormControl(null, [Validators.RequiredValidator()]),
      lastName: new FormControl(null, [Validators.RequiredValidator()]),
      email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
      telephone: new FormControl(null),
      occupation: new FormControl(null, [Validators.RequiredValidator()], { schema: 'select' }),
      country: new FormControl(null, [Validators.RequiredValidator()], { schema: 'select' }),
      // region: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.country === 'IT'))]),
      region: new FormControl(null, [], { schema: 'select' }),
      //
      printedCopy: new FormControl(null, [], { schema: 'checkbox' }),
      //
      shippingInfo: new FormGroup({
        city: new FormControl(null, []),
        province: new FormControl(null, [], { schema: 'select' }),
        zipCode: new FormControl(null, []),
        address: new FormControl(null, []),
        streetNumber: new FormControl(null, []),
        phoneNumber: new FormControl(null, []),
        /*
        city: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        province: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        zipCode: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        address: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        streetNumber: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        phoneNumber: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy)), Validators.PhoneNumberValidator()]),
        */
      }),
      //
      privacy: new FormControl(null, [Validators.RequiredTrueValidator()], { schema: 'checkbox' }),
      newsletter: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      commercial: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      promotion: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      checkRequest: new FormControl('window.antiforgery', [], { hidden: true }),
      checkField: new FormControl(null, [], { hidden: true }),
      //
      /*
      hidden: new FormControl('hidden', [], { hidden: true }), // Validators.PatternValidator(/^\d+$/),
      disabled: new FormControl('disabled', [], { disabled: true }), // Validators.PatternValidator(/^\d+$/),
      readonly: new FormControl('readonly', [], { readonly: true }), // Validators.PatternValidator(/^[a-zA-Z0-9]{3}$/),
      required: new FormControl(null, [Validators.RequiredValidator()]),
      group: new FormGroup({
        a: null,
        b: null,
      }),
      array: new FormArray([null, null]),
      */
    }));
  }

  function hasPrintedCopy(): boolean {
    return Boolean(form && form.value.printedCopy === true);
  }

  function isItaly(): boolean {
    return Boolean(form && form.value.country === 114);
  }

  const { response } = useApiGet<{
    magazine: { id: IEquatable, name: string }[],
    occupation: { id: IEquatable, name: string }[],
    country: { id: IEquatable, name: string }[],
    region: { id: IEquatable, name: string }[],
    province: { id: IEquatable, name: string }[],
  }>('/contact-form');
  if (response) {
    // console.log('response', response);
    (formGroup as FormGroup).controls.magazine.options = response.magazine;
    (formGroup as FormGroup).controls.occupation.options = response.occupation;
    (formGroup as FormGroup).controls.country.options = response.country;
    (formGroup as FormGroup).controls.region.options = response.region;
    ((formGroup as FormGroup).controls.shippingInfo as FormGroup).controls.province.options = response.province;
  }

  // console.log('ContactFormRxJs', form.value, form.flags, form.errors);

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
      <Grid.Container gap={2} justify="center">
        <FieldCollection collection={formGroup} />
      </Grid.Container>
      <Submit label="Submit" />
    </form>
  )
}
