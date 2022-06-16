import { FormAbstract, FormState, mapErrors_ } from '@forms';
import { useObservable$ } from '@hooks';
import { DependencyList, useCallback } from 'react';
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
  const [state] = useObservable$<FormState<T>>(() => control.changes$.pipe(
    map(value => ({ value: value, flags: control.flags, errors: mapErrors_(control.errors) })),
  ), { value: control.value, flags: control.flags, errors: mapErrors_(control.errors) });
  return [state, setValue, setTouched, reset, control];
}
