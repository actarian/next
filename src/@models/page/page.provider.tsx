import React from 'react';
import type { IPage } from './page';

export type IPageContext = {
  page: IPage,
};

export const PageContext = React.createContext<IPageContext>({
  page: {
    id: -1,
    schema: 'notfound',
    href: '',
    alternates: [],
    breadcrumb: [],
    images: [],
  }
});

export default function PageProvider({ children, page }: { children?: React.ReactNode, page: IPage }) {

  const context = {
    page,
  };

  // console.log('PageProvider.context', context);

  return (
    <PageContext.Provider value={context}>
      {children}
    </PageContext.Provider>
  );
}

/*
const [usePageContext, PageContextProvider] = createGenericContext<IPageContext>();

function PageProvider_({ children, page }: { children?: React.ReactNode, page: IPage }) {
  const context = {
    page,
  };
  // console.log('PageProvider.context', context);
  return (
    <PageContextProvider value={context}>
      {children}
    </PageContextProvider>
  );
};

export { usePageContext, PageProvider_ };
*/
