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
import * as React from "react";
import { useSidebar, UseSidebar } from "./useSidebar";
import { createGenericContext } from "./createGenericContext";
interface Props {
  children: React.ReactNode;
}

// Generate context
const [useSidebarContext, SidebarContextProvider] = createGenericContext<
  UseSidebar
>();

// Generate provider
const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useSidebar(true);

  return (
    <SidebarContextProvider value={[isOpen, setIsOpen]}>
      {children}
    </SidebarContextProvider>
  );
};

export { useSidebarContext, SidebarProvider };
*/
