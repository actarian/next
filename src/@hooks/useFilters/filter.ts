import { IEquatable } from "@core/entity/entity";
import { IFeatureType } from "@models/feature_type/feature_type";

export enum FilterMode {
  SELECT = 'select',
  AND = 'and',
  OR = 'or',
  QUERY = 'query',
};

export class Filter {

  id: string;
  title: string;
  mode: FilterMode;
  options: { id: IEquatable, title: string }[];
  values: IEquatable[] = [];

  constructor(featureType: IFeatureType, mode: FilterMode = FilterMode.AND) {
    this.id = featureType.id;
    this.title = featureType.title;
    this.mode = mode;
    this.options = featureType.features;
    if (mode === FilterMode.SELECT) {
      this.options.unshift({
        id: undefined,
        title: 'select',
      });
    }
  }

  filter(item, value) {
    return item.featureIds.includes(value);
  }

  match(item) {
    let match;
    if (this.mode === FilterMode.OR) {
      // OR: if item has any of the selected values
      match = this.values.length ? false : true;
      this.values.forEach(value => {
        match = match || this.filter(item, value);
      });
    } else {
      // AND: item must have all selected values
      match = true;
      this.values.forEach(value => {
        match = match && this.filter(item, value);
      });
    }
    return match;
  }

  removeInvalidOptions(items) {
    this.options = this.options.filter(option => {
      const hasItemWithOption = items.reduce((p, item) => {
        return p || this.filter(item, option.id);
      }, false);
      return hasItemWithOption;
    });
  }

  getLabel() {
    if (this.hasAny()) {
      return this.options.filter(x => x.id && this.values.indexOf(x.id) !== -1).map(x => x.title).join(', ');
    } else {
      return null;
    }
  }

  hasAny() {
    return this.values.length > 0;
  }

  has(option) {
    return this.values.indexOf(option.id) !== -1;
  }

  set(option) {
    if (this.mode === FilterMode.QUERY) {
      this.values = option ? [option] : [];
    } else {
      if (this.mode === FilterMode.SELECT) {
        this.values = [];
      }
      const index = this.values.indexOf(option.id);
      if (index === -1) {
        if (option.id != null) {
          this.values.push(option.id);
        }
      }
    }
  }

  remove(option) {
    const index = this.values.indexOf(option.id);
    if (index !== -1) {
      this.values.splice(index, 1);
    }
  }

  toggle(option) {
    if (this.has(option)) {
      this.remove(option);
    } else {
      this.set(option);
    }
  }

  clear() {
    this.values = [];
  }

}
