import { Breadcrumb } from '@models/breadcrumb/breadcrumb';
import { Category } from '@models/category/category';
import { Route } from '@models/route/route';
import { getRoutes } from '@models/route/route.service';

export async function getBreadcrumbFromCategoryTree(categoryTree: Category[], market: string = 'ww', locale: string = 'en'): Promise<Breadcrumb[]> {
  const routes: Route[] = await getRoutes();
  return categoryTree.map(x => {
    const route = x.pageSchema && x.pageId ? routes.find(r =>
      r.pageSchema === x.pageSchema &&
      r.pageId === x.pageId &&
      r.market === market &&
      r.locale === locale
    ) : null;
    const href = route ? route.href : null;
    return {
      categoryId: x.id,
      title: x.title,
      href,
    }
  });
}
