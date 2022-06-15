import type { INamedEntity } from '@core';
import { getStore } from '@core/store/store.service';

export async function getMagazines(locale?: string): Promise<INamedEntity[]> {
  const store = await getStore();
  const items = await store.magazine.findMany({ locale });
  return items;
}
