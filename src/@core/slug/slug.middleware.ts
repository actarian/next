import { resolveSchema } from '@core/schema/schema.service';
import { getCachedSlugs } from '@core/slug/slug.service';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function slugMiddleware(request: NextRequest, event: NextFetchEvent) {
  let url = request.nextUrl;
  const slugs = await getCachedSlugs(request.nextUrl.origin);
  const slug = slugs.find(s => s.slug === url.pathname);
  if (!slug) {
    // console.log('slug.notfound', url.pathname);
    return;
  }
  // console.log('slug.found', slug);
  url = request.nextUrl.clone();
  // match slug -> rewrite | not found
  url.pathname = resolveSchema(slug);
  const response = NextResponse.rewrite(url);
  return response;
}
