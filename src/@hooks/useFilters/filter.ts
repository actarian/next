import type { IEquatable } from '@core';
import type { IFeatureType } from '@models';

export enum FilterMode {
  SELECT = 'select',
  AND = 'and',
  OR = 'or',
  QUERY = 'query',
}

export interface IFilterOption {
  id: IEquatable;
  title: string;
  count?: number;
  disabled?: boolean;
}

export interface IFilter {
  id?: string;
  title?: string;
  mode?: FilterMode;
  options?: IFilterOption[];
  values?: IEquatable[];
}

export class Filter {

  id: string = 'filter';
  title: string = 'Filter';
  mode: FilterMode = FilterMode.OR;
  options: IFilterOption[] = [];
  values: IEquatable[] = [];

  constructor(options?: IFilter) {
    if (options) {
      // console.log(options.values);
      Object.assign(this, options);
    }
    if (this.mode === FilterMode.SELECT) {
      this.options.unshift({
        id: -1, // !!! should be undefined
        title: 'select',
      });
    }
  }

  static fromFeatureType(featureType: IFeatureType, mode: FilterMode = FilterMode.AND): Filter {
    return new Filter({
      id: featureType.id,
      title: featureType.title,
      mode,
      options: featureType.features,
    });
  }

  filter(item: any, value: IEquatable): boolean {
    return item.featureIds.includes(value);
  }

  match(item: any): boolean {
    let match: boolean;
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

  removeInvalidOptions(items: any[]): void {
    if (this.options) {
      this.options = this.options.filter(option => {
        const hasItemWithOption = items.reduce((p, item) => {
          return p || this.filter(item, option.id);
        }, false);
        return hasItemWithOption;
      });
    }
  }

  getLabel(): string | null {
    if (this.hasAny()) {
      return this.options.filter(x => x.id && this.values.indexOf(x.id) !== -1).map(x => x.title).join(', ');
    } else {
      return null;
    }
  }

  hasAny(): boolean {
    return this.values.length > 0;
  }

  has(option: IFilterOption): boolean {
    return this.values.indexOf(option.id) !== -1;
  }

  set(option: IFilterOption): void {
    if (this.mode === FilterMode.QUERY) {
      this.values = option ? [option.toString()] : [];
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

  remove(option: IFilterOption): void {
    const index = this.values.indexOf(option.id);
    if (index !== -1) {
      this.values.splice(index, 1);
    }
  }

  toggle(option: IFilterOption): void {
    if (this.has(option)) {
      this.remove(option);
    } else {
      this.set(option);
    }
  }

  clear(): void {
    this.values = [];
  }

}
