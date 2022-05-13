import { isApiRequest, isStaticRequest } from '@core/middleware/middleware.service';
import { slugMiddleware } from '@core/slug/slug.middleware';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (isStaticRequest(request)) {
    return;
  }
  if (isApiRequest(request)) {
    return;
  }
  return await slugMiddleware(request, event);
}

/*
import api from '../../api';
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
*/
