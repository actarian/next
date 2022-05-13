import { NextApiRequest, NextApiResponse } from 'next';
import { getSlugs } from '../../../lib/slug/slug.service';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const slugs = await getSlugs();
  console.log('slugs');
  return response;
}
