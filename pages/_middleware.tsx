import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import api from '../api';
import { fetchApi } from '../edge/fetchApi';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl.clone();
  if (url.pathname.indexOf('.') !== -1 ||
    url.pathname.indexOf('/api') === 0) {
    return;
  }
  const slugs = await fetchApi('/api/slugs');
  const slug = slugs.find(s => s.slug === url.pathname);
  if (!slug) {
    console.log('slug.notfound', url.pathname);
    return;
  }
  console.log('slug.found', slug);
  // match slug -> rewrite | not found
  // console.log('middleware', url.pathname);
  url.pathname = slug.resolve;
  const response = NextResponse.rewrite(url);
  return response;
}

export async function middleware___(request: NextRequest, event: NextFetchEvent) {
  // Get the product id from the URL
  const url = request.nextUrl.clone();
  const [, , id] = url.pathname.split('/');

  // Check on upstash if we have stock
  const hasStock = await api.cache.get(id)

  // Rewrite to the correct url
  url.pathname = hasStock ? `/product/${id}/` : `/product/${id}/no-stock`
  return NextResponse.rewrite(url)
}

export function middleware__(request: NextRequest, event: NextFetchEvent) {

  // console.log(request);

  // if the request is coming from New York, redirect to the home page
  if (request.geo.city === 'New York') {
    return NextResponse.redirect('/home')
    // if the request is coming from London, rewrite to a special page
  } else if (request.geo.city === 'London') {
    return NextResponse.rewrite('/not-home')
  }

  return NextResponse.json({ message: 'Hello World!' })

}
