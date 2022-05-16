import { apiPost } from '@core/api/api.service';
import { resolveSchema } from '@core/schema/schema.service';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function slugMiddleware(request: NextRequest, event: NextFetchEvent) {
  let url = request.nextUrl;
  const slug = await apiPost(`/slug`, { slug: url.pathname });
  // const slugs = await apiGet('/slugs');
  // const slugs = await getCachedSlugs();
  // const slug = slugs.find(s => s.slug === url.pathname);
  if (!slug) {
    console.log('slug.notfound', url.pathname);
    return;
  }
  console.log('slug.found', slug);
  url = request.nextUrl.clone();
  // match slug -> rewrite | not found
  url.pathname = resolveSchema(slug);
  console.log('slug.found', url.pathname);
  const response = NextResponse.rewrite(url);
  return response;
}
