import { Link, Spacer, Text } from '@geist-ui/core';
import { PageLayout } from '@models/page/page';
import { useCallback } from 'react';

export function MarketSelector({ page }: MarketSelectorProps) {
  const { locales, market, locale, alternates } = page;

  const markets = page.markets.map(x => ({
    ...x,
    locales: x.languages ? locales.filter(l => x.languages.includes(l.id)) : locales,
  }));

  const getHref = useCallback((market, locale) => {
    const items = alternates || [];
    const alternateItem = items.find(x => x.market === market && x.locale === locale);
    if (alternateItem) {
      return alternateItem.href;
    } else {
      return `/${market}/${locale}`;
    }
  }, [alternates]);

  return (
    <div style={{ padding: '0 10px' }}>
      {markets && markets.map(market => (
        <div key={`${market.id}`}>
          <Text type="secondary" margin={0}>{market.title}</Text>
          <Spacer h={.5} />
          {market.locales && market.locales.map(locale => (
            <div key={`${locale.id}`}>
              <Link href={getHref(market.id, locale.code)}>{locale.title}</Link>
            </div>
          ))}
          <Spacer h={.5} />
        </div>
      ))}
    </div>
  )
}

export interface MarketSelectorProps {
  page: PageLayout;
}
