import { NextApiRequest, NextApiResponse } from 'next';

export type Middleware = (request: NextApiRequest, response: NextApiResponse) => unknown;

/**
 * @name withMiddleware
 * @description combine multiple middleware before handling your API endpoint
 * @param middlewares
 */
export function withApiMiddleware(...middlewares: Middleware[]) {

  return async function withMiddlewareHandler(request: NextApiRequest, response: NextApiResponse) {

    async function evaluateHandler(middleware: Middleware, innerMiddleware?: Middleware | undefined) {
      // return early when the request has
      // been ended by a previous middleware
      if (response.headersSent) {
        return;
      }
      if (typeof middleware === 'function') {
        const handler = await middleware(request, response);
        if (typeof handler === 'function') {
          if (innerMiddleware) {
            await handler(innerMiddleware);
            const index = middlewares.indexOf(innerMiddleware);
            // remove inner middleware
            if (index >= 0) {
              middlewares.splice(index, 1);
            }
          } else {
            await handler();
          }
        }
      }
    }

    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index];
      const nextMiddleware = middlewares[index + 1];
      await evaluateHandler(middleware, nextMiddleware);
    }
  };
}
