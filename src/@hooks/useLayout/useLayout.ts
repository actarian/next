import { ILayoutContext, LayoutContext } from '@models/layout/layout.provider';
import { useContext } from 'react';

export function useLayout() {
  const { layout } = useContext<ILayoutContext>(LayoutContext);
  return layout;
}
