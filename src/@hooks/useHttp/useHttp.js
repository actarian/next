import { httpFetch } from '@core/http/http.service';
import { useEffect, useState } from 'react';

export function useHttpFetch(pathname, options = {}, service = httpFetch) {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // const source = axios.CancelToken.source();
    const fetchData = async () => {
      loading ? null : setLoading(true);
      error ? setError(false) : null;
      try {
        const response = await service(pathname, options);
        // console.log('useHttp.response', response);
        setResponse(response);
      } catch (error) {
        // console.error(error)
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
    // return () => source.cancel();
  }, [pathname, options.method, options.body]);
  return { response, loading, error, setError };
}

export function useHttpGet(pathname, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'GET' });
}

export function useHttpPost(pathname, payload, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'POST', body: payload ? JSON.stringify(payload) : null });
}

export function useHttpPut(pathname, payload, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'PUT', body: payload ? JSON.stringify(payload) : null });
}

export function useHttpPatch(pathname, payload, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'PATCH', body: payload ? JSON.stringify(payload) : null });
}

export function useHttpDelete(pathname, options = {}) {
  return useHttpFetch(pathname, { ...options, method: 'DELETE' });
}
