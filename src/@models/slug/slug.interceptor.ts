import { apiPost } from '@core/api/api.service';
import { resolveSchema } from '@core/schema/schema.service';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function slugInterceptor(request: NextRequest, event: NextFetchEvent) {
  let url = request.nextUrl;
  // !!! use global data ???
  const slug = await apiPost(`/slug`, { slug: url.pathname });
  if (!slug) {
    // console.log('slug.notfound', url.pathname);
    return;
  }
  console.log('slug.found', slug);
  url = request.nextUrl.clone();
  // match slug -> rewrite | not found
  url.pathname = resolveSchema(slug);
  // console.log('slug.found', url.pathname);
  const response = NextResponse.rewrite(url);
  return response;
}
