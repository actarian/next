import { apiHandler } from '@core/api/api.helper';
import { resolveSchema } from '@core/schema/schema.service';
import { getSlug } from '@models/slug/slug.service';
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
      { "id": 1, "schema": "product", "slug": "/products/xxxx" }
      */
      const { slug } = request.body;
      const route = await getSlug(slug);
      if (!route) {
        // console.log('slug.notfound', url.pathname);
        return;
      }
      // console.log('slug.found', slug);
      const resolvedRoute = resolveSchema(route);
      await response.unstable_revalidate(resolvedRoute);
      return response.json({ revalidated: true })
    } catch (error) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return response.status(500).send('Error revalidating')
    }
  },
});
