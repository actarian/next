import { isApiRequest, isStaticRequest } from '@core/middleware/middleware.service';
import { mockInterceptor } from '@core/mock/mock.interceptor';
import { slugInterceptor } from '@models/slug/slug.interceptor';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (isStaticRequest(request)) {
    return;
  }
  if (isApiRequest(request)) {
    return await mockInterceptor(request, event);
  }
  // console.log(request.url, request.nextUrl, event);
  return await slugInterceptor(request, event);
}
