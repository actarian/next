import { apiHandler } from '@core/api/api.helper';
import { resolveRoute } from '@core/utils';
import { getRoute } from '@models/route/route.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
  post: async (request: NextApiRequest, response: NextApiResponse) => {
    const bearer = request.headers.authorization && request.headers.authorization.replace('Bearer ', '');
    // Check for secret to confirm this is a valid request
    if (bearer !== process.env.HOOKS_SECRET) {
      return response.status(401).json({ message: 'Invalid token' })
    }
    try {
      /*
      { "id": 1, "schema": "product", "href": "/product/xxxx" }
      */
      const { href } = request.body;
      const route = await getRoute(href);
      if (!route) {
        // console.log('route.notfound', href);
        return response.status(404).send('Route not found');
      }
      // console.log('route.found', route);
      const resolvedRoute = resolveRoute(route);
      await response.unstable_revalidate(resolvedRoute);
      return response.json({ revalidated: true })
    } catch (error) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return response.status(500).send('Error revalidating');
    }
  },
});
