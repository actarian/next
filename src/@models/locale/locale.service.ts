import { FindParams, ILocalizedString } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Locale } from './locale';

export async function getLocales(params: FindParams = {}): Promise<Locale[]> {
  const store = await getStore();
  const items: any = await store.locale.findMany(params); // !!! any
  return items;
}

export function isLocalizedString(value: any): value is ILocalizedString {
  let isLocalizedString = false;
  if (value) {
    if (!Array.isArray(value) && typeof value === 'object') {
      const matchKeys = Object.keys(value).reduce((p, c) => p && /^(\w{2})(-\w{2})?$/.test(c), true);
      const matchValues = Object.values(value).reduce((p, c) => p && typeof c === 'string', true);
      // console.log(matchKeys, matchValues);
      isLocalizedString = Boolean(matchKeys && matchValues);
    }
  }
  return isLocalizedString;
}

export function localizedToString(json: ILocalizedString, locale: string = 'en', defaultLocale: string = 'en'): string {
  const localizedString = json[locale] || json[defaultLocale] || Object.values(json)[0];
  return localizedString;
}

export function localizeItem(item: any, locale: string = 'en', defaultLocale: string = 'en'): any {
  if (!Array.isArray(item) && typeof item === 'object') {
    item = { ...item };
    Object.keys(item).forEach(key => {
      const value = item[key];
      if (value) {
        if (isLocalizedString(value)) {
          item[key] = localizedToString(value, locale, defaultLocale);
        } else {
          item[key] = localizeItem(value, locale, defaultLocale);
        }
      }
    });
  }
  return item;
}

