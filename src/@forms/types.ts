import { IControlSchema } from "@config/forms";
import { INamedEntity } from "@core";

export enum FormStatus {
  Pending = 'pending',
  Valid = 'valid',
  Invalid = 'invalid',
  Disabled = 'disabled',
  Readonly = 'readonly',
  Hidden = 'hidden',
};

export type FormOptions = {
  schema?: 'group' | 'array' | IControlSchema;
  name?: string,
  label?: string,
  value?: string;
  placeholder?: string,
  required?: boolean | (() => boolean),
  hidden?: boolean | (() => boolean),
  disabled?: boolean | (() => boolean),
  readonly?: boolean | (() => boolean),
  options?: INamedEntity[];
};

export type FormFlags = { [key: string]: boolean };
export type FormErrors = { [key: string]: any };
export type FormValidationError = { key: string, value: any };
export type FormValidationErrors = FormValidationError[];

export type FormState<T> = {
  value: T | null,
  flags: FormFlags,
  errors: FormValidationErrors,
}
