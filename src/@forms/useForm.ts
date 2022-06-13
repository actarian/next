import { useObservable$ } from '@hooks/useObservable/useObservable';
import { DependencyList, useCallback, useMemo } from 'react';
import { map } from 'rxjs';
import { FormAbstract } from './forms/form-abstract';
import { FormState } from './forms/types';
import { mapErrors_ } from './helpers/helpers';

export function useForm<T extends FormAbstract>(factory: () => T, deps: DependencyList = []): [FormState<T>, (value: any) => void, () => void, T] {
  const group = useMemo(factory, deps);
  const setValue = useCallback((value: any) => {
    group.patch(value);
  }, deps);
  const setTouched = useCallback(() => {
    group.touched = true;
  }, deps);
  const [state] = useObservable$<FormState<T>>(() => group.changes$.pipe(
    map(value => ({ value: value, flags: group.flags, errors: mapErrors_(group.errors) })),
  ), { value: group.value, flags: group.flags, errors: mapErrors_(group.errors) });
  return [state, setValue, setTouched, group];
}
