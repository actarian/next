import { getData } from '@core/data/data.service';
import { Category } from './category';

export async function getCategories(): Promise<Category[]> {
  const data = await getData();
  const categories = await data.category.findMany();
  return categories;
}
