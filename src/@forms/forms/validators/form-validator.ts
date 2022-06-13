import { BehaviorSubject } from 'rxjs';

export interface IFormValidationError {
  [key: string]: any
}

/**
 * FormValidator class representing a form validator.
 * @example
 * export function EqualValidator(equal) {
 * 	return new FormValidator(function(value) {
 * 		const equal = this.params.equal;
 * 		if (!value || !equal) {
 * 			return null;
 * 		}
 * 		return value !== equal ? { equal: { equal: equal, actual: value } } : null;
 * 	}, { equal });
 * }
 */
export class FormValidator {

  validator: (value: any, params?: any) => null | IFormValidationError;
  params$: BehaviorSubject<any>;

  get params(): any {
    return this.params$.getValue();
  }

  set params(params: any) {
    if (params) {
      const current = this.params;
      const differs: boolean = Object.keys(params).reduce((flag: boolean, key: string) => {
        return flag || !current || current[key] !== params[key];
      }, false);
      if (differs) {
        // if (JSON.stringify(params) !== JSON.stringify(this.params)) {
        this.params$.next(params);
      }
    }
  }

  /**
   * Create a FormValidator.
   */
  constructor(validator: (value: any, params?: any) => any, params?: any) {
    this.validator = validator;
    this.params$ = new BehaviorSubject(params);
  }

  /**
   * validate a value
   * @param value the value to validate
   */
  validate(value: any): any {
    return this.validator(value, this.params);
  }

}
