import { useState } from 'react';

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

function decode(encoded, key?: string) {
  let decoded = null;
  if (encoded) {
    const json = window.atob(encoded);
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
  encoded = window.btoa(json);
  return encoded;
}

export function useLocation() {

  const [url, setUrl] = useState(getCurrentUrl());

  return { url, deserialize, serialize };

}
