import type { ILayoutContext } from '@models/layout/layout.provider';
import { LayoutContext } from '@models/layout/layout.provider';
import { useContext } from 'react';

export function useLayout() {
  const { layout } = useContext<ILayoutContext>(LayoutContext);
  return layout;
}
