// import { NextApiRequest, NextApiResponse } from 'next';
import { ILabel } from '@models/label/label';
import { ILocale } from '@models/locale/locale';
import { IMarket } from '@models/market/market';
import { IRouteLink } from '@models/route/route';

export interface ILayout {
  market: string;
  locale: string;
  markets: IMarket[];
  locales: ILocale[];
  labels: ILabel[];
  tree: IRouteLink;
}
