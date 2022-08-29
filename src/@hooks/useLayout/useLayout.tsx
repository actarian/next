import { createGenericContext } from '@hooks';
import type { ILayout } from '@models';
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
}

export { useLayout, LayoutProvider };

