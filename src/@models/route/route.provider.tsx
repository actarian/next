import React from 'react';
import type { IRoute } from './route';

export type IRouteContext = {
  route: IRoute,
};

export const RouteContext = React.createContext<IRouteContext | null>(null);

export default function RouteProvider({ children, route }: { children?: React.ReactNode, route: IRoute }) {

  const context = {
    route,
  };

  // console.log('RouteProvider.context', context);

  return (
    <RouteContext.Provider value={context}>
      {children}
    </RouteContext.Provider>
  );
}
