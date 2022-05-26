import React from 'react';
import { IPage } from './page';

export type IPageContext = {
  page: IPage,
};

export const PageContext = React.createContext<IPageContext>({
  page: null,
});

export default function PageProvider({ children, page }) {

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
