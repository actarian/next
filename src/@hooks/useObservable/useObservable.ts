import { deepCopy } from '@core/utils';
import { DependencyList, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isObservable, Observable, of, Subject, switchMap, tap } from 'rxjs';

export type ObservableAction = { type: string;[key: string]: any };
export type ObservableHook<T> = [T, (action: ObservableAction) => void];
// export type ObservableAction = { key: string; args: any[]; }
// export type ObservableReducer<T> = (state: T, ...args: any[]) => Observable<T> | T;
// export type ObservableReducers<T> = { [key: string]: ObservableReducer<T> };
// export type ObservableFactory<T> = (defaultState: T) => ObservableFactoryResult<T>;
// export type ObservableFactoryResult<T> = (action$: Subject<ObservableAction>) => Observable<T>;

export function useSharedReducer$<T>(reducer: (state: T, action: ObservableAction) => Observable<T> | T, defaultState: T): ObservableHook<T> {
  let subject: Subject<ObservableAction> = (reducer as any).subject_;
  if (!subject) {
    subject = (reducer as any).subject_ = new Subject<ObservableAction>();
  }
  return useReducer$(reducer, defaultState, subject);
}

export function useReducer$<T>(reducer: (state: T, action: ObservableAction) => Observable<T> | T, defaultState: T, subject?: Subject<ObservableAction>): ObservableHook<T> {
  subject = subject || new Subject<ObservableAction>();
  const action$ = useRef(subject).current;
  const dispatch = useCallback((action: ObservableAction) => action$.next(action), [action$]);
  const reducerFunc = useRef(reducer).current;
  const [state, setState] = useState<T>(defaultState);
  useEffect(() => {
    const state$ = of(defaultState).pipe(
      switchMap(state => {
        return action$.pipe(
          // filter(action => typeof actions[action.key] === 'function'),
          switchMap(action => {
            const result = reducerFunc(deepCopy<T>(state) as T, action);
            // const result = actions[action.key](deepCopy<T>(state) as T, ...action.args);
            const reducer$ = isObservable(result) ? result : of(result);
            return reducer$.pipe(
              tap(dispatch => state = dispatch),
              // tap(dispatch => console.log(action.key, dispatch)),
            );
          }),
        )
      }),
    )
    const subscription = state$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [reducerFunc, action$]);
  return [state, dispatch];
}

export function useObservable$<T>(factory: () => Observable<T>, defaultState: T, deps: DependencyList = []): [T] {
  const [state, setState] = useState<T>(defaultState);
  useEffect(() => {
    const observable$ = factory();
    const subscription = observable$.pipe(
      tap(x => {
        setState(x);
      }),
    ).subscribe();
    console.log('sub!');
    return () => {
      console.log('unsub!');
      subscription.unsubscribe();
    }
  }, deps);
  return [state];
}

export function useLayoutObservable$<T>(factory: () => Observable<T>, defaultState: T, deps: DependencyList = []): [T] {
  const [state, setState] = useState<T>(defaultState);
  useLayoutEffect(() => {
    console.log('create');
    const observable$ = factory();
    console.log('subscribe');
    const subscription = observable$.pipe(
      tap(x => {
        setState(x);
      }),
    ).subscribe();
    return () => {
      console.log('unsubscribe');
      subscription.unsubscribe();
    }
  }, deps);
  return [state];
}
