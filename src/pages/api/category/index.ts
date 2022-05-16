import { apiHandler } from '@core/api/api.helper';
import { getCategories } from '@models/category/category.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const data = await getCategories();
    response.status(200).json(data);
  },
});
