import { INamedEntity } from '@core';
import { BehaviorSubject, combineLatest, isObservable, merge, Observable, of, ReplaySubject } from 'rxjs';
import { auditTime, distinctUntilChanged, map, shareReplay, skip, switchAll, switchMap, tap } from 'rxjs/operators';
import { FormAbstractCollection } from './form-abstract-collection';
import { FormOptions, FormStatus } from './types';
import { FormValidator } from './validators/form-validator';

/**
 * Abstract class representing a form control.
 */
export abstract class FormAbstract {

  private errors_: any;
  get errors(): { [key: string]: any } {
    return this.errors_;
  }
  set errors(errors: { [key: string]: any }) {
    this.errors_ = errors;
  }

  protected status_: FormStatus = FormStatus.Pending;
  get status(): FormStatus {
    return this.status_;
  }
  set status(status: FormStatus) {
    this.status_ = status;
    // console.log(this.name, status);
  }

  name?: string;
  value_: any = null;
  submitted_: boolean = false;
  touched_: boolean = false;
  dirty_: boolean = false;
  schema: string = 'text';
  label?: string;
  placeholder?: string;
  options?: INamedEntity[];
  parent?: FormAbstractCollection<{ [key: string]: FormAbstract } | FormAbstract[]>;

  initialOptions?: FormOptions;

  protected setInitialOptions(options?: FormOptions) {
    this.initialOptions = options;
    if (options) {
      if (options.disabled === true) {
        this.status = FormStatus.Disabled;
      } else if (options.readonly === true) {
        this.status = FormStatus.Readonly;
      } else if (options.hidden === true) {
        this.status = FormStatus.Hidden;
      }
      if (options.schema) {
        this.schema = options.schema;
      }
      if (options.name) {
        this.name = options.name;
      }
      if (options.label) {
        this.label = options.label;
      }
      if (options.placeholder) {
        this.label = options.placeholder;
      }
      if (options.options) {
        this.options = options.options;
      }
    }
  }

  protected evaluateStates() {
    const options = this.initialOptions;
    if (options) {
      console.log('evaluateStates', this.name, options.disabled);
      if (typeof options.disabled === 'function' && options.disabled()) {
        this.status = FormStatus.Disabled;
      } else if (typeof options.readonly === 'function' && options.readonly()) {
        this.status = FormStatus.Readonly;
      } else if (typeof options.hidden === 'function' && options.hidden()) {
        this.status = FormStatus.Hidden;
      }
    }
  }

  validators: FormValidator[];

  protected valueSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  protected statusSubject: BehaviorSubject<null> = new BehaviorSubject(null);
  protected validatorsSubject: ReplaySubject<Observable<any[]>> = new ReplaySubject<Observable<any[]>>(1);
  protected validatorsSubjectSwitch = this.validatorsSubject.pipe(
    switchAll()
  );
  public value$: Observable<any> = this.valueSubject.pipe(
    distinctUntilChanged(),
    skip(1),
    tap(() => {
      this.submitted_ = false;
      this.dirty_ = true;
      this.statusSubject.next(null);
    }),
    shareReplay(1)
  );
  public status$: Observable<{ [key: string]: any }> = merge(this.statusSubject, this.validatorsSubjectSwitch).pipe(
    // auditTime(1),
    switchMap(() => this.validate$(this.value)),
    shareReplay(1)
  );
  public changes$: Observable<any> = merge(this.value$, this.status$).pipe(
    map(() => this.value),
    auditTime(1),
    shareReplay(1)
  );

  /**
   * Create a FormAbstract.
   * @param validators a list of validators.
   */
  constructor(validators?: (FormValidator | FormValidator[])) {
    this.validators = validators ? (Array.isArray(validators) ? validators : [validators]) : [];
  }

  /**
   * initialize subjects
   */
  protected initSubjects_(): void {
    this.switchValidators_();
  }

  private switchValidators_(): void {
    const validatorParams: Observable<any>[] = this.validators.map(x => x.params$);
    let validatorParams$: Observable<any> = validatorParams.length ? combineLatest(validatorParams) : of(validatorParams);
    this.validatorsSubject.next(validatorParams$);
  }

  /**
   * initialize observables
   */
  protected initObservables_(): void { }

  /**
   * @param value the inner control value
   * @return an object with key, value errors
   */
  validate$(value: any): Observable<{ [key: string]: any }> {
    this.evaluateStates();
    if (this.status === FormStatus.Disabled || this.status === FormStatus.Readonly || this.status === FormStatus.Hidden || this.submitted_ || !this.validators.length) {
      this.errors_ = {};
      if (this.status === FormStatus.Invalid) {
        this.status = FormStatus.Valid;
      }
      return of(this.errors_);
    } else {
      return combineLatest(this.validators.map(x => {
        let result$ = x.validate(value);
        return isObservable(result$) ? result$ : of(result$);
      })).pipe(
        map(results => {
          this.errors_ = Object.assign({}, ...results);
          this.status = Object.keys(this.errors_).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
          return this.errors_;
        })
      );
    }
  }

  /**
   * @return the pending status
   */
  get pending(): boolean { return this.status === FormStatus.Pending; }

  /**
   * @return the valid status
   */
  get valid(): boolean { return this.status !== FormStatus.Invalid; }

  /**
   * @return the invalid status
   */
  get invalid(): boolean { return this.status === FormStatus.Invalid; }

  /**
   * @return the disabled status
   */
  get disabled(): boolean { return this.status === FormStatus.Disabled; }

  /**
   * @return the enabled status
   */
  get enabled(): boolean { return this.status !== FormStatus.Disabled; }

  /**
   * @return the readonly status
   */
  get readonly(): boolean { return this.status === FormStatus.Readonly; }

  /**
   * @return the enabled status
   */
  get writeable(): boolean { return this.status !== FormStatus.Disabled && this.status !== FormStatus.Readonly; }

  /**
   * @return the hidden status
   */
  get hidden(): boolean { return this.status === FormStatus.Hidden; }

  /**
   * @return the visible status
   */
  get visible(): boolean { return this.status !== FormStatus.Hidden; }

  /**
   * @return the submitted status
   */
  get submitted(): boolean { return this.submitted_; }

  /**
   * @return the dirty status
   */
  get dirty(): boolean { return this.dirty_; }

  /**
   * @return the pristine status
   */
  get pristine(): boolean { return !this.dirty_; }

  /**
   * @return the touched status
   */
  get touched(): boolean { return this.touched_; }

  /**
   * @return the untouched status
   */
  get untouched(): boolean { return !this.touched_; }

  /**
   * @param disabled the disabled state
   */
  set disabled(disabled: boolean) {
    if (disabled) {
      if (this.status !== FormStatus.Disabled) {
        this.status = FormStatus.Disabled;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    } else {
      if (this.status === FormStatus.Disabled) {
        this.status = FormStatus.Pending;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    }
  }

  /**
   * @param disabled the disabled state
   */
  set readonly(readonly: boolean) {
    if (readonly) {
      if (this.status !== FormStatus.Readonly) {
        this.status = FormStatus.Readonly;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    } else {
      if (this.status === FormStatus.Readonly) {
        this.status = FormStatus.Pending;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    }
  }

  get flags(): { [key: string]: boolean } {
    return {
      untouched: this.untouched,
      touched: this.touched,
      pristine: this.pristine,
      dirty: this.dirty,
      pending: this.pending,
      enabled: this.enabled,
      disabled: this.disabled,
      readonly: this.readonly,
      writeable: this.writeable,
      hidden: this.hidden,
      visible: this.visible,
      valid: this.valid,
      invalid: this.invalid,
      submitted: this.submitted
    }
  }

  /**
   * @param hidden the hidden state
   */
  set hidden(hidden: boolean) {
    if (hidden) {
      if (this.status !== FormStatus.Hidden) {
        this.status = FormStatus.Hidden;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    } else {
      if (this.status === FormStatus.Hidden) {
        this.status = FormStatus.Pending;
        // this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
      }
    }
  }

  /**
   * @param submitted the submitted state
   */
  set submitted(submitted: boolean) {
    this.submitted_ = submitted;
    this.statusSubject.next(null);
  }

  /**
   * @param touched the touched state
   */
  set touched(touched: boolean) {
    this.touched_ = touched;
    this.statusSubject.next(null);
  }

  /**
   * @return inner value of the control
   */
  get value(): any { return this.value_; }

  /**
   * @param value a value
   */
  set value(value: any) {
    this.value_ = value;
    this.valueSubject.next(value);
  }

  /**
   * @param status optional FormStatus
   */
  reset(status?: FormStatus): void {
    this.status = status || FormStatus.Pending;
    this.value_ = null;
    this.dirty_ = false;
    this.touched_ = false;
    this.submitted_ = false;
    this.statusSubject.next(null);
  }

  /**
   * @param value a value
   */
  patch(value: any): void {
    this.value_ = value;
    this.dirty_ = true;
    this.submitted_ = false;
    this.statusSubject.next(null);
  }

  /**
   * adds one or more FormValidator.
   * @param validators a list of validators.
   */
  addValidators(...validators: FormValidator[]): void {
    this.validators.push(...validators);
    this.switchValidators_();
  }

  /**
   * replace one or more FormValidator.
   * @param validators a list of validators.
   */
  replaceValidators(...validators: FormValidator[]): void {
    this.validators = validators;
    this.switchValidators_();
  }

  /**
   * remove all FormValidator.
   */
  clearValidators(): void {
    this.validators = [];
    this.switchValidators_();
  }

}
