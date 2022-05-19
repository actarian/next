import { apiPost } from '@core/api/api.service';
import { resolveRoute } from '@core/utils';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function routeInterceptor(request: NextRequest, event: NextFetchEvent) {
  let url = request.nextUrl;
  // !!! use global data ???
  let route = null;
  try {
    route = await apiPost(`/route`, { href: url.pathname });
    // console.log('routeInterceptor', url.pathname, '->', route);
    if (!route) {
      // console.log('route.notfound', url.pathname);
      return;
    }
  } catch (error) {
    console.log('routeInterceptor.error', url.pathname, error.status, error.statusText);
    return;
  }
  // console.log('route.found', route);
  url = request.nextUrl.clone();
  // match route -> rewrite | not found
  url.pathname = resolveRoute(route);
  // console.log('route.found', url.pathname);
  const response = NextResponse.rewrite(url);
  return response;
}
