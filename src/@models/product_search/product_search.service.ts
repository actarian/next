import { IEquatable } from '@core/entity/entity';
import { ITile } from '@models/tile/tile';

export function filterProductItem(key: string, item: ITile, value: IEquatable) {
  switch (key) {
    case 'title':
      return item.title.toLowerCase().includes(value.toString().toLowerCase());
    default:
      return item.featureIds.includes(value);
  }
}
