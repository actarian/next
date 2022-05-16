import { apiHandler } from '@core/api/api.helper';
import { getSlug } from '@models/slug/slug.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  post: async (request: NextApiRequest, response: NextApiResponse) => {
    const { slug } = request.body;
    const data = await getSlug(slug);
    response.status(200).json(data);
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
