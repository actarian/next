import { apiPost } from '@core/api/api.service';
import { resolveRoute } from '@core/utils';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function slugInterceptor(request: NextRequest, event: NextFetchEvent) {
  let url = request.nextUrl;
  // !!! use global data ???
  let slug = null;
  try {
    slug = await apiPost(`/slug`, { slug: url.pathname });
    // console.log('slugInterceptor', url.pathname, '->', slug);
    if (!slug) {
      // console.log('slug.notfound', url.pathname);
      return;
    }
  } catch (error) {
    console.log('slugInterceptor.error', error.status, error.statusText);
    return;
  }
  // console.log('slug.found', slug);
  url = request.nextUrl.clone();
  // match slug -> rewrite | not found
  url.pathname = resolveRoute(slug);
  // console.log('slug.found', url.pathname);
  const response = NextResponse.rewrite(url);
  return response;
}
