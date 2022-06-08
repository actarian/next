import { createGenericContext } from '@hooks/useGenericContext/useGenericContext';
import type { ILayout } from '@models/index';
import React from 'react';

export type ILayoutContext = ILayout;

const [useLayout, LayoutContextProvider] = createGenericContext<ILayoutContext>();

function LayoutProvider({ children, layout }: { children?: React.ReactNode, layout: ILayout }) {
  // console.log('LayoutProvider.context', context);
  return (
    <LayoutContextProvider value={layout}>
      {children}
    </LayoutContextProvider>
  );
};

export { useLayout, LayoutProvider };
