import { useObservable$ } from '@hooks/useObservable/useObservable';
import { DependencyList, useCallback, useRef } from 'react';
import { map } from 'rxjs/operators';
import { FormAbstract } from './forms/form-abstract';
import { FormAbstractCollection } from './forms/form-abstract-collection';
import { FormState } from './forms/types';
import { mapErrors_ } from './helpers/helpers';

export function useControl<T>(control: FormAbstractCollection | FormAbstract, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, FormAbstractCollection | FormAbstract] {
  const setValue = useCallback((value: any) => {
    control.patch(value);
  }, [control, ...deps]);
  const setTouched = useCallback(() => {
    control.touched = true;
  }, [control, ...deps]);
  const [state] = useObservable$<FormState<T>>(() => control.changes$.pipe(
    map(value => ({ value: value, flags: control.flags, errors: mapErrors_(control.errors) })),
  ), { value: control.value, flags: control.flags, errors: mapErrors_(control.errors) });
  return [state, setValue, setTouched, control];
}

export function useControl__<T>(control: FormAbstractCollection | FormAbstract, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void] {
  const ref = useRef(control); // ??
  const setValue = useCallback((value: any) => {
    ref.current.patch(value);
  }, [ref.current, ...deps]);
  const setTouched = useCallback(() => {
    ref.current.touched = true;
  }, [ref.current, ...deps]);
  const [state] = useObservable$<FormState<T>>(() => ref.current.changes$.pipe(
    map(value => ({ value: value, flags: ref.current.flags, errors: mapErrors_(ref.current.errors) })),
  ), { value: ref.current.value, flags: ref.current.flags, errors: mapErrors_(ref.current.errors) });
  return [state, setValue, setTouched];
}
