import CartMini from '@components/cart-mini/cart-mini';
import { Button, Image, Link, Popover, Spacer, Tabs, Text } from '@geist-ui/core';
import { Menu, ShoppingCart } from '@geist-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import styles from './header.module.scss';

export default function Header({ page }) {
  const router = useRouter();

  const [active, setActive] = useState(false);

  const menu = page.tree;
  const locales = page.locales;
  const markets = page.markets.map(x => ({
    ...x,
    locales: x.languages ? locales.filter(l => x.languages.includes(l.id)) : locales,
  }));

  const brand = 'Brand Name';
  const currentTab = page.href;

  // console.log(page.href, menu.items.map(x => x.href).join(', '));

  const onTabChange = useCallback((tab: string) => {
    const shouldRedirect = tab !== currentTab;
    if (!shouldRedirect) {
      return;
    }
    const pathname = `${tab}`;
    router.push(pathname);
  }, [currentTab, page.locale]);

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <nav className={styles.left}>
          <NextLink href={`/${page.market}/${page.locale}`}>
            <a aria-label="Go Home" className={styles.logo}>
              <Image src="/assets/header/logo.png" width="30px" height="30px" mr={0.5} draggable={false} title={brand} />{brand}
            </a>
          </NextLink>
          {menu &&
            <Tabs leftSpace={0} activeClassName="current" align="center" value={currentTab} onChange={onTabChange}>
              {menu.items.map((item, i) => (
                <Tabs.Item key={`${item.title}-${i}`} font="14px" label={item.title} value={item.href} />
              ))}
            </Tabs>
          }
        </nav>
        <nav className={styles.right}>
          <Button icon={<ShoppingCart />} auto scale={2 / 3} px={0.6} onClick={() => setActive(true)}></Button>
          <Popover content={<MarketSelector markets={markets} locales={locales} market={page.market} locale={page.locale} alternates={page.alternates} />}>
            <Button icon={<Menu />} auto scale={2 / 3} px={0.6}>{page.locale}</Button>
          </Popover>
        </nav>
      </nav>
      <CartMini children={null} active={active} setActive={setActive}></CartMini>
    </header>
  )
}
function MarketSelector({ markets, locales, market, locale, alternates }) {

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
