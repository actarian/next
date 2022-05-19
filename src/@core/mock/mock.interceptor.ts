import { isExistingApiRoute } from '@core/middleware/middleware.service';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API_MOCK = process.env.NEXT_PUBLIC_API_MOCK || false;

export async function mockInterceptor(request: NextRequest, next: NextFetchEvent) {
  if (!API_MOCK) {
    return;
  }
  if (!isExistingApiRoute(request)) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/_mock/${encodeURIComponent(url.pathname)}`;
    const response = NextResponse.rewrite(url);
    return response;
  }
  return;
}
