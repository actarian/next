import { apiHandler } from '@core/api/api.helper';
import { getProducts } from '@core/product/product.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const data = await getProducts();
    response.status(200).json(data);
  },
});
