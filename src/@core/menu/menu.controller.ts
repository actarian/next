import { NextApiRequest, NextApiResponse } from 'next';
import { getMenu } from './menu.service';

export default async function menuGet(request: NextApiRequest, response: NextApiResponse) {
  const { query: { menu } } = request;
  const data = await getMenu(menu);
  response.setHeader('Content-Type', 'application/json');
  response.send(data);
}
