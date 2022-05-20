import { apiPost } from '@core/api/api.service';
import { resolveRoute } from '@core/utils';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function routeInterceptor(request: NextRequest, next: NextFetchEvent) {
  let url = request.nextUrl;
  let route = null;
  // const pathname = url.pathname;
  const { market, language, pathname } = decompose(url.pathname);
  try {
    route = await apiPost(`/route`, { href: pathname });
    if (!route) {
      console.log('routeInterceptor.route.notfound', url.pathname);
      return;
    }
  } catch (error) {
    console.log('routeInterceptor.error', url.pathname, error.status, error.statusText, pathname);
    return;
  }
  console.log('routeInterceptor.route.found', url.pathname, '->', route);
  url = request.nextUrl.clone();
  const resolvedPathname = resolveRoute(route);
  url.pathname = url.locale ? `/${url.locale}${resolvedPathname}` : resolvedPathname;
  // url.searchParams.set('market', market);
  // url.searchParams.set('language', language);
  const response = NextResponse.rewrite(url);
  return response;
}

const defaultMarket = 'ww';
const defaultLanguage = 'en';
const markets = ['ww', 'eu'];
const languages = ['en', 'it', 'fr'];

const routeStrategies = {
  None: 0,
  Language: 1,
  MarketLanguage: 2,
}

const routeStrategy = routeStrategies.MarketLanguage;

function decompose(pathname: string) {
  const components = pathname.split('/');
  let market = components.length > 1 ? components[1] : null;
  if (markets.indexOf(market) !== -1) {
    components.splice(1, 1);
  } else {
    market = defaultMarket;
  }
  let language = components.length > 1 ? components[1] : null;
  if (languages.indexOf(language) !== -1) {
    components.splice(1, 1);
  } else {
    language = defaultLanguage;
  }
  pathname = components.join('/');
  return { market, language, pathname };
}
