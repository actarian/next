import { apiHandler } from '@core/api/api.helper';
import { getProduct } from '@core/product/product.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    const { query: { id } } = request;
    const data = await getProduct(id as string);
    response.status(200).json(data);
  },
});
