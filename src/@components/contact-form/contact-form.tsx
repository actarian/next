import { className, INamedEntity } from '@core';
import { EmailValidator, FormAsyncValidator, FormGroup, RequiredIfValidator, RequiredTrueValidator, RequiredValidator } from '@forms';
import { FieldCollection } from '@forms/components/field-collection';
import { FieldText } from '@forms/components/field-text';
import { Grid } from '@geist-ui/core';
import { useFormBuilder, useLabel } from '@hooks';

export default function ContactFormRxJs({ data }: { data: IContactForm }) {
  const label = useLabel();

  const required = RequiredValidator();

  const requiredTrue = RequiredTrueValidator();

  const email = EmailValidator();

  /*
  const exhist: FormAsyncValidator = async (value: any, rootValue: any) => {
    return new Promise<ValidationError | null>((resolve, reject) => {
      setTimeout(() => {
        resolve(value === 'aa@aa.aa' ? { exhist: true } : null);
      }, 500);
    });
  }
  */
  const exhist: FormAsyncValidator = async (value: any, rootValue: any) => Promise.resolve(value === 'aa@aa.aa' ? { exhist: true } : null);

  const requiredIfPrintedCopy = RequiredIfValidator((value, rootValue) => rootValue?.printedCopy === true);

  const requiredIfItaly = RequiredIfValidator((value, rootValue) => rootValue?.shippingInfo.country === 'it');

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
    magazine: { schema: 'select', label: 'field.magazine', options: data.magazines, validators: required },
    //
    firstName: { schema: 'text', label: 'field.firstName', validators: required },
    lastName: { schema: 'text', label: 'field.lastName', validators: required },
    email: { schema: 'text', label: 'field.email', validators: [required, email, exhist] },
    telephone: { schema: 'text', label: 'field.telephone', validators: required },
    occupation: { schema: 'select', label: 'field.occupation', options: data.occupations, validators: required },
    //
    printedCopy: { schema: 'checkbox', label: 'field.printedCopy' },
    //
    shippingInfo: {
      schema: 'group', label: 'field.shippingInfo', children: {
        country: { schema: 'autocomplete', label: 'field.country', options: data.countries, validators: requiredIfPrintedCopy },
        region: { schema: 'autocomplete', label: 'field.region', options: data.regions, validators: requiredIfItaly },
        province: { schema: 'autocomplete', label: 'field.province', options: data.provinces, validators: requiredIfItaly },
        address: { schema: 'text', label: 'field.address', validators: requiredIfPrintedCopy },
        streetNumber: { schema: 'text', label: 'field.streetNumber', validators: requiredIfPrintedCopy },
        zipCode: { schema: 'text', label: 'field.zipCode', validators: requiredIfPrintedCopy },
        city: { schema: 'text', label: 'field.city', validators: requiredIfPrintedCopy },
        phoneNumber: { schema: 'text', label: 'field.phoneNumber', validators: requiredIfPrintedCopy },
      },
      hidden: hiddenIfNotPrintedCopy,
    },
    //
    privacy: { schema: 'checkbox', label: 'field.privacy', validators: requiredTrue },
    newsletter: { schema: 'accept', label: 'field.newsletter', validators: required },
    commercial: { schema: 'accept', label: 'field.commercial', validators: required },
    promotion: { schema: 'accept', label: 'field.promotion', validators: required },
    //
    checkRequest: { schema: 'text', value: 'window.antiforgery', hidden: true },
    checkField: { schema: 'text', hidden: true },
    //
  });

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
