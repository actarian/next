import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../../api';

interface SlugRequest extends NextApiRequest {
  query: {
    slug: string
  }
}

export default async function handler(request: SlugRequest, response: NextApiResponse) {
  // If request.method is "POST", add stock, remove it otherwise
  const hasStock = request.method === 'POST';

  // Add or remove stock
  await api.cache.set(request.query.slug, hasStock);

  // Return response
  return response.status(200).json({ stock: hasStock });
}
