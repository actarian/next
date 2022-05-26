import { FindParams } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Category, ICategorized } from './category';

export async function getCategories(params: FindParams = {}): Promise<Category[]> {
  const store = await getStore();
  const categories: any = await store.category.findMany(params); // !!! any
  return categories;
}

export async function getCategoryTree(item: ICategorized, params: FindParams = {}): Promise<Category[]> {
  const categories: Category[] = await getCategories(params);
  return getCategoryTreeWithCategories(item, categories);
}

export function getCategoryTreeWithCategories(item: ICategorized, categories: Category[]): Category[] {
  const categoryTree: Category[] = [];
  let categoryId = item.categoryId || null;
  let skipLast = false;
  while (categoryId != null) { // !!! loose
    const c = categories.find(c => c.id === categoryId);
    if (c) {
      const b = { ...c };
      categoryTree.unshift(b);
      categoryId = b.categoryId || null;
      if (
        b.pageSchema === item.schema &&
        b.pageId === item.id
      ) {
        skipLast = true;
      }
    } else {
      categoryId = null;
    }
  }
  if (!skipLast) {
    categoryTree.push({
      id: item.id,
      name: item.schema,
      title: item.title,
      slug: item.slug,
      pageSchema: item.schema,
      pageId: item.id,
    });
  }
  return categoryTree;
}
