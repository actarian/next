// import { NextApiRequest, NextApiResponse } from 'next';
import { Locale } from '@models/locale/locale';
import { Market } from '@models/market/market';
import { RouteLink } from '@models/route/route';

export interface Layout {
  market: string;
  locale: string;
  markets: Market[];
  locales: Locale[];
  tree: RouteLink;
}
