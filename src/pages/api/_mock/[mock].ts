import { resolveMockApi } from '@core/mock/mock.server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { query: { mock } } = request;
  const data = await resolveMockApi(mock as string);
  response.setHeader('Content-Type', 'application/json');
  response.send(data);
}
