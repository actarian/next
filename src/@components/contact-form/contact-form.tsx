
import { INamedEntity } from '@core';
import { className } from '@core/utils';
import { FormGroup, FormState, Validators } from '@forms';
import { FieldCollection } from '@forms/components/field-collection';
import { FieldText } from '@forms/components/field-text';
import { useFormBuilder } from '@forms/useFormBuilder';
import { Grid } from '@geist-ui/core';
import { useLabel } from '@hooks';
import { useRef } from 'react';

export default function ContactFormRxJs({ data }: { data: IContactForm }) {
  const label = useLabel();

  const formRef = useRef<FormState<any> | null>(null);

  const [form, setValue, setTouched, reset, group] = useFormBuilder<any, FormGroup>({
    magazine: { schema: 'select', label: 'contact.magazine', options: data.magazines, validators: Validators.RequiredValidator() },
    //
    firstName: { schema: 'text', label: 'contact.firstName', validators: Validators.RequiredValidator() },
    lastName: { schema: 'text', label: 'contact.lastName', validators: Validators.RequiredValidator() },
    email: { schema: 'text', label: 'contact.email', validators: [Validators.RequiredValidator(), Validators.EmailValidator()] },
    telephone: { schema: 'text', label: 'contact.telephone', validators: Validators.RequiredValidator() },
    occupation: { schema: 'select', label: 'contact.occupation', options: data.occupations, validators: Validators.RequiredValidator() },
    country: { schema: 'select', label: 'contact.country', options: data.countries, validators: Validators.RequiredValidator() },
    region: { schema: 'select', label: 'contact.region', options: data.regions, validators: Validators.RequiredIfValidator(isItaly) },
    //
    printedCopy: { schema: 'checkbox', label: 'contact.printedCopy' },
    //
    shippingInfo: {
      schema: 'group', label: 'contact.shippingInfo', children: {
        city: { schema: 'text', label: 'contact.city', validators: Validators.RequiredIfValidator(hasPrintedCopy) },
        province: { schema: 'select', label: 'contact.province', options: data.provinces, validators: Validators.RequiredIfValidator(hasPrintedCopy) },
        zipCode: { schema: 'text', label: 'contact.zipCode', validators: Validators.RequiredIfValidator(hasPrintedCopy) },
        address: { schema: 'text', label: 'contact.address', validators: Validators.RequiredIfValidator(hasPrintedCopy) },
        streetNumber: { schema: 'text', label: 'contact.streetNumber', validators: Validators.RequiredIfValidator(hasPrintedCopy) },
        phoneNumber: { schema: 'text', label: 'contact.phoneNumber', validators: Validators.RequiredIfValidator(hasPrintedCopy) },
      },
      disabled: false,
    },
    //
    privacy: { schema: 'checkbox', label: 'contact.privacy', validators: Validators.RequiredTrueValidator() },
    newsletter: { schema: 'accept', label: 'contact.newsletter', validators: Validators.RequiredValidator() },
    commercial: { schema: 'accept', label: 'contact.commercial', validators: Validators.RequiredValidator() },
    promotion: { schema: 'accept', label: 'contact.promotion', validators: Validators.RequiredValidator() },
    //
    checkRequest: { schema: 'text', value: 'window.antiforgery', hidden: true },
    checkField: { schema: 'text', hidden: true },
    //
  });

  formRef.current = form;

  function hasPrintedCopy(): boolean {
    return Boolean(formRef.current && formRef.current.value.printedCopy === true);
  }

  function isItaly(): boolean {
    return Boolean(formRef.current && formRef.current.value.country === 'it');
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('ContactFormRxJs.onSubmit', group.value);
    if (form.flags.valid) {
      // form.value
    } else {
      setTouched();
    }
    alert(JSON.stringify({ valid: form.flags.valid, value: group.value }));
  }

  const onReset = () => {
    console.log('ContactFormRxJs.onReset');
    reset();
  }

  return (
    <form className={className('form', form.flags)} onSubmit={onSubmit}>
      <FieldText control={group.controls.magazine}></FieldText>
      <Grid.Container gap={2} justify="center">
        <FieldCollection collection={group} />
      </Grid.Container>
      <button className="button" type="submit">{label('form.submit')}</button>
      <button className="button secondary" type="button" onClick={onReset}>{label('form.reset')}</button>
    </form>
  )
}

export type IContactForm = {
  countries: INamedEntity[];
  magazines: INamedEntity[];
  occupations: INamedEntity[];
  provinces: INamedEntity[];
  regions: INamedEntity[];
}

/*
    const [form, setValue, setTouched, group] = useForm<any>(() => new FormGroup({
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


        city: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        province: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        zipCode: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        address: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        streetNumber: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy))]),
        phoneNumber: new FormControl(null, [Validators.RequiredIfValidator(() => Boolean(form.value.printedCopy)), Validators.PhoneNumberValidator()]),

      }),
      //
      privacy: new FormControl(null, [Validators.RequiredTrueValidator()], { schema: 'checkbox' }),
      newsletter: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      commercial: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      promotion: new FormControl(null, [Validators.RequiredValidator()], { schema: 'checkbox' }),
      checkRequest: new FormControl('window.antiforgery', [], { hidden: true }),
      checkField: new FormControl(null, [], { hidden: true }),
      //


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
  }

*/
