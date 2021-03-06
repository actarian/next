import type { FetchRequestOptions } from '@core';
import { apiFetch } from '@core';
import { useHttpFetch } from '@hooks';

export function useApiFetch<T>(pathname: string, options: FetchRequestOptions = {}) {
  return useHttpFetch<T>(pathname, { ...options, method: 'GET' }, apiFetch);
}

export function useApiGet<T>(pathname: string, options: FetchRequestOptions = {}) {
  return useApiFetch<T>(pathname, { ...options, method: 'GET' });
}

export function useApiPost<T>(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch<T>(pathname, { ...options, method: 'POST', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiPut<T>(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch<T>(pathname, { ...options, method: 'PUT', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiPatch<T>(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch<T>(pathname, { ...options, method: 'PATCH', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiDelete<T>(pathname: string, options: FetchRequestOptions = {}) {
  return useApiFetch<T>(pathname, { ...options, method: 'DELETE' });
}
