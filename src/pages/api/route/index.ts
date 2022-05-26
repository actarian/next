import { apiHandler } from '@core/api/api.helper';
import { store } from '@models/store';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const data = await store.getRoutes();
    if (data) {
      response.status(200).json(data);
    } else {
      response.status(500).send('impossible to read data');
    }
  },
  post: async (request: NextApiRequest, response: NextApiResponse) => {
    const { href } = request.body;
    const data = await store.getRoute(href);
    // console.log('route.apiHandler', href, '->', data);
    if (data) {
      response.status(200).json(data);
    } else {
      throw 'not found';
      // response.status(404).send('Route not found');
    }
  }
});

/*
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { href } = request.body;
    const data = await store.getRoutes(href);
    response.status(200).json(data);
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
*/
