import { FormAbstract, FormState, mapErrors_ } from '@forms';
import { useObservable$ } from '@hooks';
import { DependencyList, useCallback, useEffect, useState } from 'react';
import { map } from 'rxjs/operators';

export function useControl<T>(control: FormAbstract, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, () => void, FormAbstract] {
  const setValue = useCallback((value: any) => {
    control.patch(value);
  }, [control, ...deps]);

  const setTouched = useCallback(() => {
    control.touched = true;
  }, [control, ...deps]);

  const reset = useCallback(() => {
    control.reset();
  }, deps);

  const [state, setState] = useState<FormState<T>>({ value: control.value as T, flags: control.state, errors: mapErrors_(control.errors) })

  useEffect(() => {
    const onChange = (value: T) => {
      const newState = { value, flags: control.state, errors: mapErrors_(control.errors) };
      // console.log('useControl.onChange', newState);
      setState(newState);
    };
    control.on('change', onChange);
    // control.validateAndChange_();
    return () => control.off('change', onChange);
  }, deps);

  return [state, setValue, setTouched, reset, control];
}

export function useControl__<T>(control: FormAbstract, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, () => void, FormAbstract] {
  const setValue = useCallback((value: any) => {
    control.patch(value);
  }, [control, ...deps]);

  const setTouched = useCallback(() => {
    control.touched = true;
  }, [control, ...deps]);

  const reset = useCallback(() => {
    control.reset();
  }, deps);

  const [state] = useObservable$<FormState<T>>(() => control.changes$.pipe(
    map(value => ({ value: value, flags: control.state, errors: mapErrors_(control.errors) })),
  ), { value: control.value, flags: control.state, errors: mapErrors_(control.errors) });

  return [state, setValue, setTouched, reset, control];
}
