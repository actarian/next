import { apiFetch } from '@core/api/api.service';
import { useHttpFetch } from '@hooks/useHttp/useHttp';

export function useApiFetch(pathname, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'GET' }, apiFetch);
}

export function useApiGet(pathname, options = {}) {
  return useApiFetch(pathname, { ...options, method: 'GET' });
}

export function useApiPost(pathname, payload, options = {}) {
  return useApiFetch(pathname, { ...options, method: 'POST', body: payload ? JSON.stringify(payload) : null });
}

export function useApiPut(pathname, payload, options = {}) {
  return useApiFetch(pathname, { ...options, method: 'PUT', body: payload ? JSON.stringify(payload) : null });
}

export function useApiPatch(pathname, payload, options = {}) {
  return useApiFetch(pathname, { ...options, method: 'PATCH', body: payload ? JSON.stringify(payload) : null });
}

export function useApiDelete(pathname, options = {}) {
  return useApiFetch(pathname, { ...options, method: 'DELETE' });
}
