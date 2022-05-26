import { IEntity, IQuerable } from "@core/entity/entity";
import { ICategory } from "@models/category/category";
import { ILabel } from "@models/label/label";
import { ILocale } from "@models/locale/locale";
import { IMarket } from "@models/market/market";
import { IMenu } from "@models/menu/menu";
import { IPage } from "@models/page/page";
import { IProduct } from "@models/product/product";
import { IRoute } from "@models/route/route";

export type AppStore = {
  about: IQuerable<any>;
  category: IQuerable<ICategory>;
  country: IQuerable<any>;
  homepage: IQuerable<any>;
  label: IQuerable<ILabel>;
  locale: IQuerable<ILocale>;
  market: IQuerable<IMarket>;
  menu: IQuerable<IMenu>;
  notfound: IQuerable<any>;
  page: IQuerable<IPage>;
  product_index: IQuerable<any>;
  product: IQuerable<IProduct>;
  route: IQuerable<IRoute>;

  [key: string]: IQuerable<IEntity>;
}
