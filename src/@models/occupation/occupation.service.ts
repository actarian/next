import type { INamedEntity } from '@core';
import { getStore } from '@core/store/store.service';

export async function getOccupations(locale?: string): Promise<INamedEntity[]> {
  const store = await getStore();
  const items = await store.occupation.findMany({ locale });
  return items;
}
