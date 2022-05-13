import { httpGet } from '../http/http.service';
import { merge } from '../utils/utils.service';

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:3000';
const API_PATH = process.env.NEXT_PUBLIC_API_PATH || '/api';
const API_BEARER = process.env.STRAPI_BEARER || '7584f15d12972fb1e7695e998dd5e4c754f46c74d06a08e8d76f556adcd045e48cd52bed6faac098784471ac273ee40243194b9cff7eba3c4a768f8f41d2d51959a7f767b943c7f0170f6e5f632db523803c357083bf7a7bf03ee8e0df2d8ce5cd52e0211283b34d7781313da775018a9e950433d2b6faf711c20e5a63b25243';

const defaultOptions = {
  mode: 'cors',
  headers: {
    Authorization: `Bearer ${API_BEARER}`,
  },
};

export async function apiFetch(pathname, options: any = {}) {
  const url = `${API_ORIGIN}${API_PATH}${pathname}`;
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


