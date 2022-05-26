import { FindParams } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { ILabel } from './label';

export async function getLabels(params: FindParams = {}): Promise<ILabel[]> {
  const store = await getStore();
  const items: any = await store.label.findMany(params); // !!! any
  return items;
}

export function resolveLabel(labels: ILabel[], id: string): string {
  const label = labels.find(x => x.id === id);
  return label ? label.text.toString() : id;
}

/*
export function localizedLabel(labels: Label[], id: string, locale: string = 'en', defaultLocale: string = 'en'): Promise<Label> {
  const label = labels.find(x => x.id === id);
  if (label) {
    return store.localizeValue(label, locale, defaultLocale);
  }
}
*/