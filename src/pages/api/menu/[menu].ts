import { apiHandler } from '@core/api/api.helper';
import { store } from '@models/store';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const { query: { menu } } = request;
    const data = await store.getMenu(menu as string);
    if (data) {
      response.status(200).json(data);
    } else {
      throw 'not found';
      // response.status(404).send('not found');
    }
  },
});
