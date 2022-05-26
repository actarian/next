import React from 'react';
import { ILayout } from './layout';

export type ILayoutContext = {
  layout: ILayout,
};

export const LayoutContext = React.createContext<ILayoutContext>({
  layout: null,
});

export default function LayoutProvider({ children, layout }) {

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