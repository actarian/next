
import { isApiRequest, isStaticRequest } from '@core/middleware/middleware.service';
import { mockInterceptor } from '@core/mock/mock.interceptor';
import { routeInterceptor } from '@models/route/route.interceptor';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, next: NextFetchEvent) {

  /*
   * Skipping static requests
  */
  if (isStaticRequest(request)) {
    return;
  }

  /*
   * Checking for mock interceptor for api requests
  */
  if (isApiRequest(request)) {
    return await mockInterceptor(request, next);
  }

  /*
    * Resolving CMS routes
  */
  return await routeInterceptor(request, next);
}
