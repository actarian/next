import { className, INamedEntity } from '@core';
import { EmailValidator, FormGroup, FormState, RequiredIfValidator, RequiredTrueValidator, RequiredValidator } from '@forms';
import { FieldCollection } from '@forms/components/field-collection';
import { FieldText } from '@forms/components/field-text';
import { Grid } from '@geist-ui/core';
import { useFormBuilder, useLabel } from '@hooks';
import { useRef } from 'react';

export default function ContactFormRxJs({ data }: { data: IContactForm }) {
  const label = useLabel();

  const formRef = useRef<FormState<any> | null>(null);

  const required = RequiredValidator();
  const requiredTrue = RequiredTrueValidator();
  const email = EmailValidator();
  const requiredIfPrintedCopy = RequiredIfValidator((value, rootValue) => rootValue?.printedCopy === true);
  const requiredIfItaly = RequiredIfValidator((value, rootValue) => rootValue?.country === 'it');
  /*
  const hiddenIfNotPrintedCopy = async (value: any, rootValue: any) => new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(!(rootValue?.printedCopy === true));
    }, 500);
  });
  */
  // const hiddenIfNotPrintedCopy = async (value: any, rootValue: any) => Promise.resolve(!(rootValue?.printedCopy === true));
  const hiddenIfNotPrintedCopy = (value: any, rootValue: any) => !(rootValue?.printedCopy === true);

  const [form, setValue, setTouched, reset, group] = useFormBuilder<any, FormGroup>({
    magazine: { schema: 'select', label: 'contact.magazine', options: data.magazines, validators: required },
    //
    firstName: { schema: 'text', label: 'contact.firstName', validators: required },
    lastName: { schema: 'text', label: 'contact.lastName', validators: required },
    email: { schema: 'text', label: 'contact.email', validators: [required, email] },
    telephone: { schema: 'text', label: 'contact.telephone', validators: required },
    occupation: { schema: 'select', label: 'contact.occupation', options: data.occupations, validators: required },
    country: { schema: 'select', label: 'contact.country', options: data.countries, validators: required },
    region: { schema: 'select', label: 'contact.region', options: data.regions, validators: requiredIfItaly },
    //
    printedCopy: { schema: 'checkbox', label: 'contact.printedCopy' },
    //
    shippingInfo: {
      schema: 'group', label: 'contact.shippingInfo', children: {
        city: { schema: 'text', label: 'contact.city' },
        province: { schema: 'select', label: 'contact.province', options: data.provinces },
        zipCode: { schema: 'text', label: 'contact.zipCode' },
        address: { schema: 'text', label: 'contact.address' },
        streetNumber: { schema: 'text', label: 'contact.streetNumber' },
        phoneNumber: { schema: 'text', label: 'contact.phoneNumber' },
      },
      hidden: hiddenIfNotPrintedCopy,
      validators: requiredIfPrintedCopy,
    },
    //
    privacy: { schema: 'checkbox', label: 'contact.privacy', validators: requiredTrue },
    newsletter: { schema: 'accept', label: 'contact.newsletter', validators: required },
    commercial: { schema: 'accept', label: 'contact.commercial', validators: required },
    promotion: { schema: 'accept', label: 'contact.promotion', validators: required },
    //
    checkRequest: { schema: 'text', value: 'window.antiforgery', hidden: true },
    checkField: { schema: 'text', hidden: true },
    //
  });

  formRef.current = form;

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
      {false &&
        <FieldText control={group.controls.magazine}></FieldText>
      }
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
      magazine: new FormControl(null, [required], { schema: 'select' }),
      //
      firstName: new FormControl(null, [required]),
      lastName: new FormControl(null, [required]),
      email: new FormControl(null, [required, email]),
      telephone: new FormControl(null),
      occupation: new FormControl(null, [required], { schema: 'select' }),
      country: new FormControl(null, [required], { schema: 'select' }),
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
      privacy: new FormControl(null, [requiredTrue], { schema: 'checkbox' }),
      newsletter: new FormControl(null, [required], { schema: 'checkbox' }),
      commercial: new FormControl(null, [required], { schema: 'checkbox' }),
      promotion: new FormControl(null, [required], { schema: 'checkbox' }),
      checkRequest: new FormControl('window.antiforgery', [], { hidden: true }),
      checkField: new FormControl(null, [], { hidden: true }),
      //


      hidden: new FormControl('hidden', [], { hidden: true }), // Validators.PatternValidator(/^\d+$/),
      disabled: new FormControl('disabled', [], { disabled: true }), // Validators.PatternValidator(/^\d+$/),
      readonly: new FormControl('readonly', [], { readonly: true }), // Validators.PatternValidator(/^[a-zA-Z0-9]{3}$/),
      required: new FormControl(null, [required]),
      group: new FormGroup({
        a: null,
        b: null,
      }),
      array: new FormArray([null, null]),


    }));
  }

*/
