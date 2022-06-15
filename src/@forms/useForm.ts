import { useObservable$ } from '@hooks/useObservable/useObservable';
import { DependencyList, useCallback, useMemo } from 'react';
import { map } from 'rxjs';
import { FormAbstract } from './forms/form-abstract';
import { FormState } from './forms/types';
import { mapErrors_ } from './helpers/helpers';

export function useForm<T extends FormAbstract>(factory: () => T, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, () => void, T] {
  const collection = useMemo(factory, deps);
  const setValue = useCallback((value: any) => {
    collection.patch(value);
  }, deps);
  const setTouched = useCallback(() => {
    collection.touched = true;
  }, deps);
  const reset = useCallback(() => {
    collection.reset();
  }, deps);
  const [state] = useObservable$<FormState<T>>(() => collection.changes$.pipe(
    map(value => ({ value: value, flags: collection.flags, errors: mapErrors_(collection.errors) })),
  ), { value: collection.value, flags: collection.flags, errors: mapErrors_(collection.errors) });
  return [state, setValue, setTouched, reset, collection];
}
