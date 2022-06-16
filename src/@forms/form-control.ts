import { FormAbstract } from './form-abstract';
import { FormOptions } from './types';
import { FormValidator } from './validators/form-validator';

/**
 * Class representing a FormControl.
 */
export class FormControl extends FormAbstract {

  /**
   * Create a FormControl.
   * @example
   * const form = new FormControl(null);
   *
   * form.changes$.subscribe(changes => {
   * 	console.log(changes);
   * });
   * @param value The value of the control.
   * @param validators a list of validators.
   */
  constructor(value: any = null, validators?: FormValidator | FormValidator[], options?: FormOptions) {
    super(validators);
    this.value_ = value;
    this.setInitialOptions(options);
    this.errors = {};
    this.initSubjects_();
    this.initObservables_();
    this.statusSubject.next(null);
  }

}

/** Shortcut for new FormControl. */
export function formControl(value: any = null, validators?: FormValidator | FormValidator[]) {
  return new FormControl(value, validators);
}
