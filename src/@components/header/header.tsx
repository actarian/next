import { CartMini, MarketSelector } from '@components';
import { Badge, Button, Image, Popover, Tabs } from '@geist-ui/core';
import { Heart, Menu, ShoppingCart } from '@geist-ui/icons';
import { useLayout, useMounted, usePage, useWishlist } from '@hooks';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import styles from './header.module.scss';

export default function Header() {
  const router = useRouter();
  const layout = useLayout();
  const page = usePage();

  const [active, setActive] = useState(false);

  const menu = layout.tree;

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
  }, [currentTab, layout.locale]);

  const { count: getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  const mounted = useMounted();
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <nav className={styles.left}>
          <NextLink href={`/${layout.market}/${layout.locale}`}>
            <a aria-label="Go Home" className={styles.logo}>
              <Image src="/assets/header/logo.png" width="30px" height="30px" mr={0.5} draggable={false} title={brand} />{brand}
            </a>
          </NextLink>
          {menu &&
            <Tabs leftSpace={0} activeClassName="current" align="center" value={currentTab} onChange={onTabChange}>
              {menu.items.map((item, i) => (
                <Tabs.Item key={`${item.title}-${i}`} font="14px" label={item.title} value={item.href || ''} />
              ))}
            </Tabs>
          }
        </nav>
        <nav className={styles.right}>
          {mounted &&
            <Badge.Anchor>
              {wishlistCount > 0 && <Badge scale={0.5}>{wishlistCount}</Badge>}
              <Button icon={<Heart />} auto scale={2 / 3} px={0.6}></Button>
            </Badge.Anchor>
          }
          <Button icon={<ShoppingCart />} auto scale={2 / 3} px={0.6} onClick={() => setActive(true)}></Button>
          <Popover content={<MarketSelector />}>
            <Button icon={<Menu />} auto scale={2 / 3} px={0.6}>{layout.locale}</Button>
          </Popover>
        </nav>
      </nav>
      <CartMini active={active} setActive={setActive}>{null}</CartMini>
    </header>
  )
}
