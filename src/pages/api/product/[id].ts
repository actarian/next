import { apiHandler } from '@core/api/api.helper';
import { store } from '@models/store';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const { query: { id } } = request;
    const data = await store.getProduct(id as string);
    if (data) {
      response.status(200).json(data);
    } else {
      throw 'not found';
      // response.status(404).send('not found');
    }
  },
});
