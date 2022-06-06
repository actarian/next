import React from 'react';
import type { ILayout } from './layout';

export type ILayoutContext = {
  layout: ILayout,
};

export const LayoutContext = React.createContext<ILayoutContext>({
  layout: {
    market: '',
    locale: '',
    markets: [],
    locales: [],
    labels: [],
    tree: {
      items: [],
    }
  },
});

export default function LayoutProvider({ children, layout }: { children?: React.ReactNode, layout: ILayout }) {

  const context = {
    layout,
  };

  // console.log('LayoutProvider.context', context);

  return (
    <LayoutContext.Provider value={context}>
      {children}
    </LayoutContext.Provider>
  );
}
