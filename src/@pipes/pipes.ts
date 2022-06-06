import { useMemo } from 'react';

export function usePrice(value: number, { a, b } = { a: null, b: null }): string {
  return useMemo(() => {
    return value + '€';
  }, [value, a, b]);
}
