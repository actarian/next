import { createGenericContext } from '@hooks/useGenericContext/useGenericContext';
import type { IPage } from '@models/index';
import React from 'react';

export type IPageContext = IPage;

const [usePage, PageContextProvider] = createGenericContext<IPageContext>();

function PageProvider({ children, page }: { children?: React.ReactNode, page: IPage }) {
  // console.log('PageProvider.context', context);
  return (
    <PageContextProvider value={page}>
      {children}
    </PageContextProvider>
  );
};

export { usePage, PageProvider };
