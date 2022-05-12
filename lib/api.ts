import { fetchHttp } from './http';

export async function getMenu(menu) {
  const response = await fetchHttp('get', `http://localhost:3000/api/menu/${menu}`);
  console.log('getMenu', menu);
  return response.data;
}
