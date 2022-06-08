import { createGenericContext } from '@hooks/useGenericContext/useGenericContext';
import type { IRoute } from '@models/index';
import React from 'react';

export type IRouteContext = IRoute;

const [useRoute, RouteContextProvider] = createGenericContext<IRouteContext>();

function RouteProvider({ children, route }: { children?: React.ReactNode, route: IRoute }) {
  // console.log('RouteProvider.context', context);
  return (
    <RouteContextProvider value={route}>
      {children}
    </RouteContextProvider>
  );
};

export { useRoute, RouteProvider };
