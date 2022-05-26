import { Link, Spacer, Text } from '@geist-ui/core';
import { useLayout } from '@hooks/useLayout/useLayout';
import { usePage } from '@hooks/usePage/usePage';
import { useCallback } from 'react';

export function MarketSelector() {
  const { markets, market, locales, locale } = useLayout();
  const { alternates } = usePage();

  const items = markets.map(x => ({
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
      {items && items.map(item => (
        <div key={`${item.id}`}>
          <Text type="secondary" margin={0}>{item.title}</Text>
          <Spacer h={.5} />
          {item.locales && item.locales.map(locale => (
            <div key={`${locale.id}`}>
              <Link href={getHref(item.id, locale.code)}>{locale.title}</Link>
            </div>
          ))}
          <Spacer h={.5} />
        </div>
      ))}
    </div>
  )
}
