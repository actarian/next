import { merge } from '../utils/utils.service';

const defaultOptions = {
  // method: 'POST', // *GET, POST, PUT, DELETE, etc.
  // mode: 'cors', // no-cors, *cors, same-origin
  // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  // credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // redirect: 'follow', // manual, *follow, error
  // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  // body: JSON.stringify(data) // body data type must match "Content-Type" header
};

export async function httpFetch(url, options = {}) {
  // console.log('httpFetch', url, options);
  const httpOptions = merge({ ...defaultOptions }, options);
  const httpResponse = await fetch(url, httpOptions);
  const response = await httpResponse.json();
  return response;
  /*
  // const source = axios.CancelToken.source();
  return await axios[method](url, {
    // cancelToken: source.token,
    headers: {
      Authorization: `Bearer ${BEARER}`
    }
  });
  // return () => source.cancel();
  */
}

export async function httpGet(url, options = {}) {
  return await httpFetch(url, { ...options, method: 'GET' });
}

export async function httpPost(url, payload, options = {}) {
  return await httpFetch(url, { ...options, method: 'POST', body: JSON.stringify(payload) });
}

export async function httpPut(url, payload, options = {}) {
  return await httpFetch(url, { ...options, method: 'PUT', body: JSON.stringify(payload) });
}

export async function httpPatch(url, payload, options = {}) {
  return await httpFetch(url, { ...options, method: 'PATCH', body: JSON.stringify(payload) });
}

export async function httpDelete(url, options = {}) {
  return await httpFetch(url, { ...options, method: 'DELETE' });
}


