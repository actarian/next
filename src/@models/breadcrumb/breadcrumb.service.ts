import { Store } from '@core/store/store';
import { getStore } from '@core/store/store.service';
import { Breadcrumb, IBreadcrumb } from '@models/breadcrumb/breadcrumb';
import { ICategorized } from '@models/category/category';
import { Category } from 'data/types/category';

export async function getBreadcrumb(item: ICategorized, injectedStore?: Store): Promise<Breadcrumb[]> { // !!! any
  const store = injectedStore || (await getStore());
  if (!store) {
    return [];
  }

  const category = store.category;
  if (!category) {
    return [];
  }

  const categories: Category[] = await category.findMany() as Category[];

  const breadcrumb: IBreadcrumb[] = [];

  let categoryId = item.categoryId || null;
  let skipLast = false;
  while (categoryId !== null) {
    // console.log(categoryId);
    const c = categories.find(c => c.id === categoryId);
    if (c) {
      const b = { ...c };
      breadcrumb.unshift(b);
      categoryId = b.categoryId || null;
      if (
        b.schema === item.schema &&
        b.schemaId === item.id
      ) {
        skipLast = true;
      }
    } else {
      categoryId = null;
    }
  }

  if (!skipLast) {
    breadcrumb.push({
      title: item.title,
      slug: item.slug,
      schema: item.schema,
      schemaId: item.id,
      categoryId: 0,
    });
  }

  breadcrumb.reduce((p, c, i) => {
    const href = `${p}/${c.slug}`;
    c.href = href;
    return href === '/' ? '' : href;
  }, '');

  // console.log('getBreadcrumb.breadcrumb', breadcrumb);

  return breadcrumb;
}

export async function resolveHref(item: ICategorized, injectedStore?: Store): Promise<string> {
  const breadcrumb = await getBreadcrumb(item, injectedStore);
  const href = breadcrumb.length > 0 ? breadcrumb.pop().href : '';
  // console.log('resolveHref', href);
  return href;
}

export async function decorateHref(item: any): Promise<any> {
  const href = await resolveHref(item);
  return { ...item, href };
}
