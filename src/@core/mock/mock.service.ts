import JsonService from '@core/json/json.service';
import { localizeItem } from '@models/locale/locale.service';
import { FindParams, IEntity } from '../entity/entity';

export default class MockService<T extends IEntity> extends JsonService<T> {

  protected override decorator_(item: any, params: FindParams = {}): any {
    if (params.locale) {
      return localizeItem(item, params.locale);
    } else {
      return item;
    }
  }

}
