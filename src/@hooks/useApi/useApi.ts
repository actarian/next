import { apiFetch } from '@core/api/api.service';
import type { FetchRequestOptions } from '@core/http/http.service';
import { useHttpFetch } from '@hooks/useHttp/useHttp';

export function useApiFetch(pathname: string, options: FetchRequestOptions = {}) {
  return useHttpFetch(pathname, { ...options, method: 'GET' }, apiFetch);
}

export function useApiGet(pathname: string, options: FetchRequestOptions = {}) {
  return useApiFetch(pathname, { ...options, method: 'GET' });
}

export function useApiPost(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch(pathname, { ...options, method: 'POST', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiPut(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch(pathname, { ...options, method: 'PUT', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiPatch(pathname: string, payload: any, options: FetchRequestOptions = {}) {
  return useApiFetch(pathname, { ...options, method: 'PATCH', body: payload ? JSON.stringify(payload) : undefined });
}

export function useApiDelete(pathname: string, options: FetchRequestOptions = {}) {
  return useApiFetch(pathname, { ...options, method: 'DELETE' });
}
