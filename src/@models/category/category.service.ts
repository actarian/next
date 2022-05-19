import { getCachedStore } from '@core/store/store.service';
import { Category } from './category';

export async function getCategories(): Promise<Category[]> {
  const store = await getCachedStore();
  const categories: any = await store.category.findMany(); // !!! any
  return categories;
}
