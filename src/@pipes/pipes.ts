import { useMemo } from 'react';

export function toPrice(value, { a, b } = { a: null, b: null }): string {
  return useMemo(() => {
    return value + '€';
  }, [value, a, b]);
}
