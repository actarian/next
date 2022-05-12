import axios from 'axios';
import { BEARER } from '../constants';

export async function fetchHttp(method, url) {
  console.log('fetchHttp', method, url);
  // const source = axios.CancelToken.source();
  return await axios[method](url, {
    // cancelToken: source.token,
    headers: {
      Authorization: `Bearer ${BEARER}`
    }
  });
  // return () => source.cancel();
}
