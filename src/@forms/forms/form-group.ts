import { FormAbstract } from './form-abstract';
import { FormAbstractCollection } from './form-abstract-collection';
import { FormValidator } from './validators/form-validator';

/**
 * Class representing a FormGroup.
 */
export class FormGroup extends FormAbstractCollection<{ [key: string]: FormAbstract }> {

  /**
   * Create a FormControl.
   * @example
   * const form = new FormGroup({
   * 	firstName: null,
   *  lastName: null,
   * });
   *
   * form.changes$.subscribe(changes => {
   * 	console.log(changes);
   * });
   * @param controls an object containing controls.
   * @param validators a list of validators.
   */
  constructor(controls: { [key: string]: FormAbstract | any } = {}, validators?: FormValidator | FormValidator[]) {
    super(controls, validators);
  }

}

/**
 * Shortcut for new FormGroup
 */
export function formGroup(controls: { [key: string]: FormAbstract | any } = {}, validators?: FormValidator | FormValidator[]) {
  return new FormGroup(controls, validators);
}
