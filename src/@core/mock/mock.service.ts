import JsonService from '@core/json/json.service';
import { isLocalizedString } from '@core/locale/locale.service';
import { FindParams, IEntity } from '../entity/entity';

export default class MockService<T extends IEntity> extends JsonService<T> {

  protected override decorator_(item: any, params: FindParams = {}): any {
    if (!Array.isArray(item) && typeof item === 'object') {
      item = { ...item };
      // console.log('MockService.decorator_', params);
      const locale = params.locale || 'en';
      const defaultLocale = params.defaultLocale || 'en';
      Object.keys(item).forEach(key => {
        const value = item[key];
        if (value) {
          if (isLocalizedString(value)) {
            const localizedString = value[locale] || value[defaultLocale] || Object.values(value)[0];
            // console.log('isLocalizedString', localizedString, 'locale', locale, 'defaultLocale', defaultLocale, value);
            item[key] = localizedString;
          } else {
            item[key] = this.decorator_(value, params);
          }
        }
      });
    }
    return item;
  }

}
