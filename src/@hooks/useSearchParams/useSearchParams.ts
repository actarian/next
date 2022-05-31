import { NextRouter, useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

const isBrowser = typeof window !== 'undefined';

function decode_(base64: string): string {
  return isBrowser ? window.atob(base64) : Buffer.from(base64, 'base64').toString();
}

function encode_(text: string): string {
  return isBrowser ? window.btoa(text) : Buffer.from(text).toString('base64');
}

function searchParams_(url: string) {
  return new URLSearchParams(url);
}

function has_(url: string, key: string) {
  const params = searchParams_(url);
  return params.has(key);
}

function get_(url: string, key: string): any {
  const params = searchParams_(url);
  return params.get(key);
}

function set_(url: string, keyOrValue, value): URLSearchParams {
  const params = searchParams_(url);
  if (typeof keyOrValue === 'string') {
    params.set(keyOrValue, value);
  } else {
    params.set(keyOrValue, '');
  }
  return params;
  // push_(params);
  // replace_(params);
}

function push_(params: URLSearchParams) {
  if (window.history && window.history.pushState) {
    const title = document.title;
    const url = `${window.location.href.split('?')[0]}?${params.toString()}`;
    window.history.pushState(params.toString(), title, url);
  }
}

function replace_(params: URLSearchParams) {
  if (window.history && window.history.pushState) {
    const title = document.title;
    const url = `${window.location.href.split('?')[0]}?${params.toString()}`;
    window.history.replaceState(params.toString(), title, url);
  }
}

function replace__(from: string, to: string) {
  const history = window.history;
  if (history && history.replaceState) {
    const location = window.location;
    const title = document.title;
    if (location.pathname === '/') {
      const url = location.origin + to + location.search;
      history.replaceState(history.state, title, url);
    } else if (location.href.indexOf(from) !== -1) {
      const url = location.href.replace(from, to);
      history.replaceState(history.state, title, url);
    }
  }
}

function deserialize_(url: string, key?: string) {
  const encoded = get_(url, 'params');
  return decode(encoded, key);
}

function serialize_(url: string, keyOrValue, value): URLSearchParams {
  let params = deserialize_(url);
  const encoded = encode(params, keyOrValue, value);
  params = set_(url, 'params', encoded);
  return params;
}

export function decode(encoded: string, key?: string): any {
  let decoded = null;
  if (encoded) {
    const json = decode_(encoded);
    decoded = JSON.parse(json);
  }
  if (key && decoded) {
    decoded = decoded[key];
  }
  return decoded || null;
}

function encode(params: any, keyOrValue, value) {
  params = params || {};
  let encoded = null;
  if (typeof keyOrValue === 'string') {
    params[keyOrValue] = value;
  } else {
    params = keyOrValue;
  }
  const json = JSON.stringify(params);
  encoded = encode_(json);
  return encoded;
}

function searchParamsToObject_(params: URLSearchParams): any {
  const entries = params.entries();
  const result = {}
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

export function getSearchParams(url: string, key: string): any {
  const components = url.split('?');
  const search = components[1] || '';
  const searchParams = new URLSearchParams(search);
  const params = searchParams.get('params');
  const value = params ? decode(params, key) : null;
  console.log('getSearchParams', value, params, search);
  return value;
}

export function replaceSearchParams(router: NextRouter, key: string, value: any) {
  const components = router.asPath.split('?');
  const searchParams = serialize_(components[1] || '', key, value);
  const query = searchParamsToObject_(searchParams);
  const pathname = components[0] || '';
  console.log(pathname, query);
  router.replace({ pathname, query });
}

export function pushSearchParams(router: NextRouter, key: string, value: any) {
  const components = router.asPath.split('?');
  const searchParams = serialize_(components[1] || '', key, value);
  const query = searchParamsToObject_(searchParams);
  const pathname = components[0] || '';
  console.log(pathname, query);
  router.push({ pathname, query });
}

export function replaceSearchParamsSilently(key: string, value: any) {
  if (isBrowser) {
    const searchParams = serialize_(window.location.search, key, value);
    replace_(searchParams);
  }
}

export function useSearchParams(key: string) {
  const router = useRouter();

  const initialValue = useMemo(() => {
    const value = getSearchParams(router.asPath, key);
    return value;
  }, []);

  const params = initialValue;
  // const [params, setParams_] = useState(initialValue);

  const setParams = useCallback((params) => {
    replaceSearchParams(router, key, params);
  }, [key]);

  const replaceParamsSilently = useCallback((params) => {
    replaceSearchParamsSilently(key, params);
  }, [key]);

  return { params, replaceParamsSilently };
}
