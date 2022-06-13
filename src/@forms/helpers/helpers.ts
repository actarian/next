import { FormErrors, FormValidationError } from '../forms/types';

export function mapErrors_(errors: FormErrors): FormValidationError[] {
  return Object.keys(errors).map(key => ({ key, value: errors[key] }));
}
