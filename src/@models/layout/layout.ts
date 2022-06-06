// import { NextApiRequest, NextApiResponse } from 'next';
import type { ILabel } from '@models/label/label';
import type { ILocale } from '@models/locale/locale';
import type { IMarket } from '@models/market/market';
import type { IRouteLink } from '@models/route/route';

export interface ILayout {
  market: string;
  locale: string;
  markets: IMarket[];
  locales: ILocale[];
  labels: ILabel[];
  tree?: IRouteLink;
}
