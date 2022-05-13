import { BEARER } from '../../../constants';
import { httpGet } from '../http/http.service';
import { merge } from '../utils/utils.service';

const origin = 'http://localhost:3000';
const api = '/api';

const defaultOptions = {
  mode: 'cors',
  headers: {
    Authorization: `Bearer ${BEARER}`,
  },
};

export async function apiFetch(pathname, options = {}) {
  const url = `${origin}${api}${pathname}`;
  const apiOptions = merge({ ...defaultOptions }, options);
  const apiResponse = await httpGet(url, apiOptions);
  return apiResponse;
}

export async function apiGet(url, options = {}) {
  return await apiFetch(url, { ...options, method: 'GET' });
}

export async function apiPost(url, payload, options = {}) {
  return await apiFetch(url, { ...options, method: 'POST', body: JSON.stringify(payload) });
}

export async function apiPut(url, payload, options = {}) {
  return await apiFetch(url, { ...options, method: 'PUT', body: JSON.stringify(payload) });
}

export async function apiPatch(url, payload, options = {}) {
  return await apiFetch(url, { ...options, method: 'PATCH', body: JSON.stringify(payload) });
}

export async function apiDelete(url, options = {}) {
  return await apiFetch(url, { ...options, method: 'DELETE' });
}


