import { INamedEntity } from '@core';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from './event-emitter';
import { ControlType, FormActivator, FormCollection, FormOptions, FormValidator, ValidationError } from './types';
import { isThenable, validValue } from './utils';

export class FormAbstract extends EventEmitter {

  private changes$_: Subject<any> = new Subject();

  // callbacks_: Function[] = [];
  errors_: ValidationError;
  value_: any;
  validators_: FormValidator[];
  state_: any;
  name?: string | number;
  parent?: FormCollection;

  // new
  schema: 'group' | 'array' | ControlType = 'text';
  options?: INamedEntity[];
  protected initialOptions_?: FormOptions;
  private markAsDirty_: boolean = false;

  constructor(value: any, validators?: (FormValidator | FormValidator[])) {
    super();
    this.errors_ = {};
    this.value_ = validValue(value);
    this.validators_ = validators ? (Array.isArray(validators) ? validators : [validators]) : [];
    this.state_ = {
      invalid: false,
      disabled: false,
      hidden: false,
      readonly: false,
      dirty: false,
      touched: false,
      submitted: false,
      // derived
      valid: true,
      enabled: true,
      visible: true,
      writeable: true,
      pristine: true,
      untouched: true,
      unsubmitted: true,
    };
    /*
    const self_ = this;
    this.state_ = new Proxy({
      invalid: false,
      disabled: false,
      hidden: false,
      readonly: false,
      dirty: false,
      touched: false,
      submitted: false,
      // derived
      valid: true,
      enabled: true,
      visible: true,
      writeable: true,
      pristine: true,
      untouched: true,
      unsubmitted: true,
    },
      {
        get(obj, key) {
          switch (key) {
            case 'valid':
              return !obj.invalid;
            case 'enabled':
              return !obj.disabled;
            case 'visible':
              return !obj.hidden;
            case 'writeable':
              return !obj.readonly;
            case 'pristine':
              return !obj.dirty;
            case 'dirty':
              return self_.value_ != null;
            case 'untouched':
              return !obj.touched;
            case 'unsubmitted':
              return !obj.submitted;
            default:
              return obj[key];
          }
        },
        set(obj, key, value) {
          switch (key) {
            case 'disabled':
            case 'hidden':
            case 'readonly':
              if (obj[key] !== value) {
                console.log(self_.name, key, value);
                self_.revalidate_();
              }
            break;
            case 'invalid':
            // case 'dirty':
            case 'touched':
            case 'submitted':
              if (obj[key] !== value) {
                console.log(self_.name, key, value);
                self_.markAsDirty_ = true;
              }
              break;
            default:
              obj[key] = value;
          }
          return true;
        }
      });
    */
  }

  protected setInitialOptions(options?: FormOptions) {
    this.initialOptions_ = options;
    if (options) {
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
        this.placeholder = options.placeholder;
      }
      if (options.options) {
        this.options = options.options;
      }
      /*
      // !!! todo
      if (options.required === true) {
        this.state_.required = true;
      }
      */
      if (options.disabled === true) {
        this.state_.disabled = true;
      }
      if (options.readonly === true) {
        this.state_.readonly = true;
      }
      if (options.hidden === true) {
        this.state_.hidden = true;
      }
    }
    // this.updateState_();
  }

  protected async checkAsyncState_(root?: FormCollection): Promise<boolean> {
    const options = this.initialOptions_;
    let dirty = false;
    if (options) {
      const disabledDirty = await this.checkAsyncPropState_('disabled', options.disabled, root);
      const hiddenDirty = await this.checkAsyncPropState_('hidden', options.hidden, root);
      const readonlyDirty = await this.checkAsyncPropState_('readonly', options.readonly, root);
      dirty = disabledDirty || hiddenDirty || readonlyDirty;
    }
    return dirty;
  }

  protected async checkAsyncPropState_(key: string, option?: FormActivator, root?: FormCollection): Promise<boolean> {
    let dirty = false;
    if (typeof option === 'function') {
      let result = option(this.value_, root?.value, this, root);
      result = isThenable(result) ? await result : result;
      if (this.state_[key] !== result) {
        this.state_[key] = result;
        dirty = true;
      }
    }
    return dirty;
  }

  protected async revalidate_() {
    if (this.parent) {
      return await this.parent.revalidate_();
    }
    // console.log('revalidate_', this.name);
    await this.validateAndChange_();
  }

  protected async validate_(root?: FormCollection) {
    let markAsDirty_ = await this.checkAsyncState_(root);
    let errors: ValidationError = {};
    if (this.validators.length === 0 || this.disabled || this.submitted) {
      this.state_.invalid = false;
    } else {
      let promises = this.validators_.map((x) => x(this.value_, root?.value, this, root)).filter((x) => x).map(x => isThenable(x) ? x : Promise.resolve(x));
      const results = (await Promise.all(promises)).filter(x => x);
      this.state_.invalid = results.length > 0;
      errors = Object.assign(errors, ...results);
      // console.log(`${this.name}.value`, '=', this.value_, '{', ...Object.keys(errors), '}');
      // return this.errors_;
    }
    markAsDirty_ = markAsDirty_ || Object.keys(this.errors_).join(',') !== Object.keys(errors).join(',');
    this.errors_ = errors;
    this.markAsDirty_ = markAsDirty_;
    this.updateState_();
    // console.log(this.name, this.state_, markAsDirty_);
  }

  async validateAndChange_(root?: FormCollection) {
    await this.validate_(root);
    this.markAsDirty_ = true;
    this.change_();
    // console.log('validateAndChange_', this);
  }

  protected async updateStateAndChange_() {
    this.updateState_();
    this.markAsDirty_ = true;
    this.change_();
  }

  protected change_() {
    if (!this.markAsDirty_) {
      return;
    }
    // console.log(`${this.name || 'unnamed'}.didChange`);
    this.markAsDirty_ = false;
    if (this.changes$_) {
      this.changes$_.next(this.value);
    }
    this.emit('change', this.value);
    /*
    if (this.parent) {
      this.parent.change_.call(this.parent);
    }
    */
  }

  protected updateState_() {
    const state = this.state_;
    state.dirty = this.value_ != null;
    state.valid = !state.invalid;
    state.enabled = !state.disabled;
    state.visible = !state.hidden;
    state.writeable = !state.disabled && !state.readonly;
    state.pristine = !state.dirty;
    state.untouched = !state.touched;
    state.unsubmitted = !state.submitted;
    // console.log('FormAbstract', Object.keys(state).filter((key) => state[key]).join(', '));
  }

  /*
  set changes$(changes) {
    this.changes$_ = changes;
  }
  */
  /*
   bind(callback) {
     const index = this.callbacks_.indexOf(callback);
     if (index === -1) {
       this.callbacks_.push(callback);
       this.revalidate_();
     }
   }
   unbind(callback) {
     const index = this.callbacks_.indexOf(callback);
     if (index !== -1) {
       this.callbacks_.splice(index, 1);
     }
   }
   once(callback) {
     const this_ = this;
     function once() {
       callback();
       this_.unbind(once);
     }
     this.bind(once);
   }
   bindControl(control) {
     const index = this.binds_.indexOf(control);
     if (index === -1) {
       this.binds_.push(control);
     }
   }
   unbindControl(control) {
     const index = this.binds_.indexOf(control);
     if (index !== -1) {
       this.binds_.splice(index, 1);
     }
   }
   */

  reset() {
    this.value_ = null;
    const state = this.state_;
    state.dirty = false;
    state.touched = false;
    state.submitted = false;
    this.revalidate_();
  }

  patch(value: any) {
    this.value = value;
  }

  addValidators(...validators: FormValidator[]): void {
    this.validators.push(...validators);
    // console.log('addValidators', this.name, this.validators);
    this.revalidate_();
  }

  replaceValidators(...validators: FormValidator[]): void {
    this.validators = validators;
  }

  clearValidators() {
    this.validators = [];
  }

  // getter & setter
  protected get path(): (string | number)[] {
    if (this.name != null) {
      return this.parent ? [...this.parent.path, this.name] : [this.name];
    } else {
      return [];
    }
  }

  protected get root(): FormCollection | FormAbstract {
    let parent: FormCollection | FormAbstract = this;
    while (parent.parent) {
      parent = parent.parent;
    }
    return parent;
  }

  private label_?: string;
  get label(): string {
    return this.label_ || this.name?.toString() || '';
  }
  set label(label: string) {
    this.label_ = label;
  }

  private placeholder_?: string;
  get placeholder(): string {
    return this.placeholder_ || this.name?.toString() || '';
  }
  set placeholder(placeholder: string) {
    this.placeholder_ = placeholder;
  }

  get validators() {
    return this.validators_;
  }

  set validators(validators) {
    if (this.validators_ !== validators) {
      this.validators_ = validators;
      this.revalidate_();
    }
  }

  get state() {
    return this.state_;
  }

  get errors() {
    return this.errors_;
  }

  get invalid() {
    return this.state_.invalid;
  }

  get disabled() {
    return this.state_.disabled;
  }

  get hidden() {
    return this.state_.hidden;
  }

  get readonly() {
    return this.state_.readonly;
  }

  get dirty() {
    return this.state_.dirty;
  }

  get touched() {
    return this.state_.touched;
  }

  get submitted() {
    return this.state_.submitted;
  }

  get valid() {
    return this.state_.valid;
  }

  get enabled() {
    return this.state_.enabled;
  }

  get visible() {
    return this.state_.visible;
  }

  get writeable() {
    return this.state_.writeable;
  }

  get pristine() {
    return this.state_.pristine;
  }

  get untouched() {
    return this.state_.untouched;
  }

  get unsubmitted() {
    return this.state_.unsubmitted;
  }

  get value() {
    return this.value_;
  }

  set value(value) {
    value = validValue(value);
    if (this.value_ !== value) {
      this.value_ = value;
      this.state_.submitted = false;
      this.revalidate_();
    }
  }

  /*
  set invalid(invalid) {
    if (this.state_.invalid !== invalid) {
      this.state_.invalid = invalid;
      this.revalidate_();
    }
  }
  */

  // internal disabled type boolean | () => boolean | Promise<boolean>
  set disabled(disabled) {
    if (this.state_.disabled !== disabled) {
      this.state_.disabled = disabled;
      this.revalidate_();
    }
  }

  set hidden(hidden) {
    if (this.state_.hidden !== hidden) {
      this.state_.hidden = hidden;
      this.revalidate_();
    }
  }

  set readonly(readonly) {
    if (this.state_.readonly !== readonly) {
      this.state_.readonly = readonly;
      this.revalidate_();
    }
  }

  set dirty(dirty) {
    if (this.state_.dirty !== dirty) {
      this.state_.dirty = dirty;
      this.updateStateAndChange_();
    }
  }

  set touched(touched) {
    if (this.state_.touched !== touched) {
      this.state_.touched = touched;
      this.updateStateAndChange_();
    }
  }

  set submitted(submitted) {
    if (this.state_.submitted !== submitted) {
      this.state_.submitted = submitted;
      this.updateStateAndChange_();
    }
  }

  get changes$(): Observable<any> {
    if (!this.changes$_) {
      this.changes$_ = new Subject();
    }
    return this.changes$_;
  }
}
