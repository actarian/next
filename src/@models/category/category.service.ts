import { getStore } from '@core/store/store.service';
import { Category } from './category';

export async function getCategories(): Promise<Category[]> {
  const store = await getStore();
  const categories: any = await store.category.findMany(); // !!! any
  return categories;
}
