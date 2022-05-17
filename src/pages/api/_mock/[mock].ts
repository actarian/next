import { apiHandler } from '@core/api/api.helper';
import { resolveMockApi } from '@core/mock/mock.server';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const { query: { mock } } = request;
    const data = await resolveMockApi(mock as string);
    if (data) {
      response.status(200).json(data);
    } else {
      throw 'not found';
      // response.status(404).send('not found');
    }
  },
});
