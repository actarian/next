import { isApiRequest, isStaticRequest } from '@core/middleware/middleware.service';
import { mockInterceptor } from '@core/mock/mock.interceptor';
import { routeInterceptor } from '@models/route/route.interceptor';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, next: NextFetchEvent) {
  // console.log('pages.middleware', request.nextUrl.locale);
  if (isStaticRequest(request)) {
    return;
  }
  if (isApiRequest(request)) {
    return await mockInterceptor(request, next);
  }
  // console.log('pages.middleware', request.nextUrl.pathname);
  return await routeInterceptor(request, next);
}
