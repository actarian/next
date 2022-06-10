import { Link, Spacer, Text } from '@geist-ui/core';
import { useLayout, usePage } from '@hooks';
import { useCallback } from 'react';

export default function MarketSelector() {
  const { markets, market: currentMarket, locales, locale: currentLocale } = useLayout();
  const { href, alternates } = usePage();

  const items = markets.map(x => ({
    ...x,
    locales: x.languages ? locales.filter(l => x.languages ? x.languages.includes(l.id) : true) : locales,
  }));

  const getHref = useCallback((market: string, locale: string, currentMarket: string, currentLocale: string) => {
    const items = alternates || [];
    const alternateItem = items.find(x => x.marketId === market && x.localeId === locale);
    if (alternateItem) {
      return alternateItem.id.toString();
    } else if (market === currentMarket && locale === currentLocale && href) {
      return href;
    } else {
      return `/${market}/${locale}`;
    }
  }, [alternates]);

  return (
    <div style={{ padding: '0 10px' }}>
      {items && items.map(item => (
        <div key={`${item.id}`}>
          <Text type="secondary" margin={0}>{item.title}</Text>
          <Spacer h={.5} />
          {item.locales && item.locales.map(locale => (
            <div key={`${locale.id}`}>
              <Link href={getHref(item.id, locale.id, currentMarket, currentLocale)}>{locale.title}</Link>
            </div>
          ))}
          <Spacer h={.5} />
        </div>
      ))}
    </div>
  )
}
