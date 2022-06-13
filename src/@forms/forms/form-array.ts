import { FormAbstract } from './form-abstract';
import { FormAbstractCollection } from './form-abstract-collection';
import { FormValidator } from './validators/form-validator';

/**
 * Class representing a FormArray.
 */
export class FormArray extends FormAbstractCollection {

  /**
   * Create a FormArray.
   * @example
   * const form = new FormArray([null, null, null]);
   *
   * form.changes$.subscribe(changes => {
   * 	console.log(changes);
   * });
   * @param controls an array containing controls.
   * @param validators a list of validators.
   */
  constructor(controls: (FormAbstract | any)[] = [], validators?: (FormValidator | FormValidator[])) {
    super(controls, validators);
  }

  forEach_(callback: (control: FormAbstract, key: number) => any) {
    this.controls.forEach((control: FormAbstract, key: number) => callback(control, key));
  }

  get value(): any[] {
    return this.reduce_((result: any[], control: FormAbstract, key: number) => {
      result[key] = control.value;
      return result;
    }, []); // init as array
  }

  get length(): number {
    return this.controls.length;
  }

  protected init(control: FormAbstract, key: number): void {
    this.controls.length = Math.max(this.controls.length, key);
    this.controls[key] = this.initControl_(control, key);
  }

  set(control: FormAbstract, key: number): void {
    // this.controls.length = Math.max(this.controls.length, key);
    // this.controls[key] = this.initControl_(control);
    this.controls.splice(key, 1, this.initControl_(control, key));
    this.switchSubjects_();
  }

  add(control: FormAbstract, key: number): void {
    this.controls.length = Math.max(this.controls.length, key);
    this.controls[key] = this.initControl_(control, key);
    this.switchSubjects_();
  }

  push(control: FormAbstract): void {
    // this.controls.length = Math.max(this.controls.length, key);
    // this.controls[key] = this.initControl_(control);
    this.controls.push(this.initControl_(control, this.controls.length));
    this.switchSubjects_();
  }

  insert(control: FormAbstract, key: number): void {
    this.controls.splice(key, 0, this.initControl_(control, key));
    this.switchSubjects_();
  }

  remove(control: FormAbstract): void {
    const key: number = this.controls.indexOf(control);
    if (key !== -1) {
      this.removeKey(key);
    }
  }

  removeKey(key: number): void {
    if (this.controls.length > key) {
      this.controls.splice(key, 1);
      this.switchSubjects_();
    }
  }

  at(key: number) {
    return this.controls[key];
  }

}

/**
 * Shortcut for new FormArray
 */
export function formArray(controls: (FormAbstract | any)[] = [], validators?: FormValidator | FormValidator[]) {
  return new FormArray(controls, validators);
}
