export enum FormStatus {
  Pending = 'pending',
  Valid = 'valid',
  Invalid = 'invalid',
  Disabled = 'disabled',
  Readonly = 'readonly',
  Hidden = 'hidden',
};

export type FormOptions = { schema?: string, name?: string, label?: string, options?: any[], disabled?: boolean, readonly?: boolean, hidden?: boolean };
export type FormFlags = { [key: string]: boolean };
export type FormErrors = { [key: string]: any };
export type FormValidationError = { key: string, value: any };
export type FormValidationErrors = FormValidationError[];

export type FormState<T> = {
  value: T | null,
  flags: FormFlags,
  errors: FormValidationErrors,
}
