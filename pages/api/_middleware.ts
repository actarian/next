import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const USE_MOCK = true;

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!USE_MOCK) {
    return;
  }
  const url = request.nextUrl.clone();
  url.pathname = `/api/_mock/${encodeURIComponent(url.pathname)}`;
  const response = NextResponse.rewrite(url);
  return response;
}
