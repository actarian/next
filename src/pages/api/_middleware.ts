import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API_MOCK = process.env.NEXT_PUBLIC_API_MOCK;

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!API_MOCK) {
    return;
  }
  const url = request.nextUrl.clone();
  // console.log(url.pathname);
  url.pathname = `/api/_mock/${encodeURIComponent(url.pathname)}`;
  const response = NextResponse.rewrite(url);
  return response;
}
