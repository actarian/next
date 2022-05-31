import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

const isBrowser = typeof window !== 'undefined';

function getCurrentUrl() {
  if (isBrowser && window.history) {
    const url = new URL(window.location.href);
    return url;
  }
}

function has(key: string) {
  const params = new URLSearchParams(window.location.search);
  // console.log('LocationService.has', params);
  return params.has(key);
}

function get(key: string) {
  const params = new URLSearchParams(window.location.search);
  // console.log('LocationService.get', params);
  return params.get(key);
}

function set(keyOrValue, value) {
  const params = new URLSearchParams(window.location.search);
  if (typeof keyOrValue === 'string') {
    params.set(keyOrValue, value);
  } else {
    params.set(keyOrValue, '');
  }
  pushParams(params);
  // console.log('LocationService.set', params, keyOrValue, value);
}

function pushParams(params: URLSearchParams) {
  if (window.history && window.history.pushState) {
    const title = document.title;
    const url = `${window.location.href.split('?')[0]}?${params.toString()}`;
    window.history.pushState(params.toString(), title, url);
  }
}

function replace(from: string, to: string) {
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

function deserialize(key?: string) {
  if (!isBrowser) {
    return;
  }
  const encoded = get('params');
  return decode(encoded, key);
}

function serialize(keyOrValue, value) {
  if (!isBrowser) {
    return;
  }
  const params = deserialize();
  const encoded = encode(params, keyOrValue, value);
  set('params', encoded);
}

function decode_(base64) {
  return isBrowser ? window.atob(base64) : Buffer.from(base64, 'base64').toString();
}

function encode_(text) {
  return isBrowser ? window.btoa(text) : Buffer.from(text).toString('base64');
}

function decode(encoded, key?: string) {
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

export function useLocation(key) {

  const router = useRouter();

  const initialValue = useMemo(() => {

    console.log(router.asPath);
    const search = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(search);
    const params = searchParams.get('params');
    console.log('useLocation', search, params);

    const initialValue = params ? decode(params, key) : null;
    console.log('initialValue', initialValue);

    return initialValue;
  }, []);

  const params = initialValue;
  // const [params, setParams_] = useState(initialValue);

  const setParams = useCallback((key, params) => {
    serialize(key, params);
  }, []);

  return { params, setParams };

}