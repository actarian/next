import { apiHandler } from '@core/api/api.helper';
import { getSlug, getSlugs } from '@models/slug/slug.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const data = await getSlugs();
    if (data) {
      response.status(200).json(data);
    } else {
      response.status(500).send('impossible to read data');
    }
  },
  post: async (request: NextApiRequest, response: NextApiResponse) => {
    const { slug } = request.body;
    const data = await getSlug(slug);
    // console.log('slug.apiHandler', slug, '->', data);
    if (data) {
      response.status(200).json(data);
    } else {
      throw 'not found';
      // response.status(404).send('Slug not found');
    }
  }
});

/*
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { slug } = request.body;
    const data = await getSlug(slug);
    response.status(200).json(data);
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
*/
