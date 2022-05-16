import { apiHandler } from '@core/api/api.helper';
import { getMenu } from '@models/menu/menu.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const { query: { menu } } = request;
    const data = await getMenu(menu);
    response.status(200).json(data);
  },
});
