import { FormErrors, FormValidationError } from '@forms';

export function mapErrors_(errors: FormErrors): FormValidationError[] {
  return Object.keys(errors).map(key => ({ key, value: errors[key] }));
}
