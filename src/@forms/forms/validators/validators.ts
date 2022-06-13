import { FormValidator } from './form-validator';

/**
 * a null validator
 */
export function NullValidator() {
  return new FormValidator(function (value: any, params?: any) {
    return null;
  });
}

/**
 * a required validator
 */
export function RequiredValidator(): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    // console.log('RequiredValidator', value, (value == null || value.length === 0) ? { required: true } : null);
    return (value == null || value.length === 0) ? { required: true } : null;
  });
  // return (value == null || value.length === 0) ? 'required' : null;
}

/**
 * a required and true validator
 */
export function RequiredTrueValidator(): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    // console.log('RequiredTrueValidator', value, value === true ? null : { required: true });
    return value === true ? null : { required: true };
  });
}

/**
 * a min number value validator
 */
export function MinValidator(min: number): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    const min = params.min;
    if (!value || !min) {
      return null;
    }
    value = parseFloat(value);
    return !isNaN(value) && value < min ? { min: { min: min, actual: value } } : null;
  }, { min });
}

/**
 * a max number value validator
 */
export function MaxValidator(max: number): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    const max = params.max;
    if (!value || !max) {
      return null;
    }
    value = parseFloat(value);
    return !isNaN(value) && value > max ? { max: { max: max, actual: value } } : null;
  }, { max });
}

/**
 * a min string length validator
 */
export function MinLengthValidator(minlength: number): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    const minlength = params.minlength;
    if (!value || !minlength) {
      return null;
    }
    const length = value ? value.length : 0;
    return length < minlength ? { minlength: { requiredLength: minlength, actualLength: length } } : null;
  }, { minlength });
}

/**
 * a max string length validator
 */
export function MaxLengthValidator(maxlength: number): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    const maxlength = params.maxlength;
    if (!value || !maxlength) {
      return null;
    }
    const length = value ? value.length : 0;
    return length > maxlength ? { minlength: { requiredLength: maxlength, actualLength: length } } : null;
  }, { maxlength });
}

/**
 * a regex pattern validator
 */
export function PatternValidator(pattern: string | RegExp): FormValidator {
  return new FormValidator(function (value: any, params?: any) {
    const pattern = params.pattern;
    if (!value || !pattern) {
      return null;
    }
    const regex = patternToRegEx(pattern);
    return regex.test(value) ? null : { pattern: { requiredPattern: regex.toString(), actualValue: value } };
  }, { pattern });
}

/**
 * an email pattern validator
 */
export function EmailValidator(): FormValidator {
  const regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return new FormValidator(function (value: any, params?: any) {
    if (!value) {
      return null;
    }
    return regex.test(value) ? null : { email: true };
  });
}

function patternToRegEx(pattern: string | RegExp): RegExp {
  let regex;
  if (pattern instanceof RegExp) {
    regex = pattern;
  } else if (typeof pattern === 'string') {
    pattern = pattern.charAt(0) === '^' ? pattern : `^${pattern}`;
    pattern = pattern.charAt(pattern.length - 1) === '$' ? pattern : `${pattern}$`;
    regex = new RegExp(pattern);
  }
  return regex || new RegExp('');
}

export const Validators = {
  NullValidator,
  RequiredValidator,
  RequiredTrueValidator,
  MinValidator,
  MaxValidator,
  MinLengthValidator,
  MaxLengthValidator,
  PatternValidator,
  EmailValidator
};
