import JsonService from '@core/json/json.service';
import { isLocalizedString } from '@core/locale/locale.service';
import { IEntity } from '../entity/entity';

export default class MockService<T extends IEntity> extends JsonService<T> {

  protected override decorator_(item: any): any {
    if (!Array.isArray(item) && typeof item === 'object') {
      item = { ...item };
      Object.keys(item).forEach(key => {
        const value = item[key];
        if (value) {
          if (isLocalizedString(value)) {
            // console.log('isLocalizedString', value);
            item[key] = Object.values(value)[0];
          } else {
            item[key] = this.decorator_(value);
          }
        }
      });
    }
    return item;
  }

}
