import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { ICategory } from '@models/category/category';
import { getCategoryTree } from '@models/category/category.service';
import { ILayout } from '@models/layout/layout';
import { IRouteLink, SchemaType } from '@models/route/route';
import { getBreadcrumbFromCategoryTree } from '@models/route/route.service';
import { store } from '@models/store';
import { IPage, IPageLayout } from './page';

export async function getPage(schema: string, id: IEquatable, market?: string, locale?: string): Promise<IPage | null> {
  const store = await getStore();
  const page = await store.page.findOne({ where: { schema, id }, market, locale }) as any;
  // console.log(page, market, locale);
  if (page) {
    const routes = await store.route.findMany({ where: { pageSchema: schema, pageId: id } });
    const currentRoute = routes.find(x => x.market === market && x.locale === locale);
    const alternates = routes.filter(x => x.market === market && x.locale !== locale);
    const categoryTree: ICategory[] = await getCategoryTree(page);
    const breadcrumb: IRouteLink[] = await getBreadcrumbFromCategoryTree(categoryTree, market, locale);
    return {
      ...page,
      href: currentRoute.href, // !!! route?
      alternates,
      breadcrumb: breadcrumb,
    };
  } else {
    console.log('PageService.getPage.notfound', schema, id, locale);
    return null;
  }
}

export async function getPageLayout(schema: string, id: IEquatable, market?: string, locale?: string): Promise<IPageLayout | null> {
  const page = await getPage(schema, id, market, locale);
  if (page) {
    const layout = await store.getLayout(market, locale);
    return {
      ...page,
      ...layout,
    };
  } else {
    return null;
  }
}

export async function getErrorPageLayout(): Promise<{ layout: ILayout, page: IPage } | null> {
  const defaultMarket = 'ww';
  const defaultLocale = 'en';
  const layout = await store.getLayout(defaultMarket, defaultLocale);
  const title = store.resolveLabel(layout.labels, 'notfound.title');
  const abstract = store.resolveLabel(layout.labels, 'notfound.abstract');
  const page = {
    id: 'notfound',
    schema: 'notfound' as SchemaType,
    href: '',
    alternates: [],
    breadcrumb: [],
    images: [],
    title,
    abstract,
    meta: {
      title,
      description: abstract,
      keywords: '',
      robots: 'all',
    },
  };
  return { layout, page };
}
