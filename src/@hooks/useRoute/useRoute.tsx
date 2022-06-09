import { createGenericContext } from '@hooks';
import type { IRoute } from '@models';
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

