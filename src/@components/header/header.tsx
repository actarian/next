import { CartMini, MarketSelector } from '@components';
import WishlistMini from '@components/wishlist-mini/wishlist-mini';
import { Badge, Button, Image, Popover, Tabs } from '@geist-ui/core';
import { Heart, HeartFill, Menu, ShoppingCart } from '@geist-ui/icons';
import { useCart, useLayout, useMounted, usePage, useUI, useWishlist } from '@hooks';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from './header.module.scss';

let I = 0;

export default function Header() {
  const router = useRouter();
  const layout = useLayout();
  const page = usePage();

  const menu = layout.tree;

  const brand = 'Brand Name';
  const currentTab = page.href;

  // console.log('Header', ++I, menu?.items.length);
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

  const { count: getCartCount } = useCart();
  const cartCount = getCartCount();

  const [drawer, reduceUI] = useUI(state => [state.drawer, state.reduce]);
  function onSetDrawer(value?: string) {
    reduceUI((state) => ({ drawer: value }));
  }

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
          {/*menu && menu.items.map((item, i) => (
            <NextLink key={`${item.title}-${i}`} href={item.href || ''}>{item.title}</NextLink>
          ))*/}
          {menu &&
            <Tabs leftSpace={0} activeClassName="current" align="center" value={currentTab} onChange={onTabChange}>
              {menu.items.map((item, i) => (
                <Tabs.Item key={`${item.title}-${i}`} font="14px" label={item.title} value={item.href || ''} />
              ))}
            </Tabs>
          }
        </nav>
        <nav className={styles.right}>
          {mounted ?
            <Badge.Anchor>
              {wishlistCount > 0 && <Badge scale={0.5} type="error">{wishlistCount}</Badge>}
              <Button icon={wishlistCount > 0 ? <HeartFill color="white" /> : <Heart />} auto scale={2 / 3} px={0.6} onClick={() => onSetDrawer('wishlist')}></Button>
            </Badge.Anchor> :
            <Button icon={<Heart />} auto scale={2 / 3} px={0.6}></Button>
          }
          {mounted ?
            <Badge.Anchor>
              {cartCount > 0 && <Badge scale={0.5} type="error" dot />}
              <Button icon={<ShoppingCart />} auto scale={2 / 3} px={0.6} onClick={() => onSetDrawer('cart')}></Button>
            </Badge.Anchor> :
            <Button icon={<ShoppingCart />} auto scale={2 / 3} px={0.6} onClick={() => onSetDrawer('cart')}></Button>
          }
          <Popover content={<MarketSelector />}>
            <Button icon={<Menu />} auto scale={2 / 3} px={0.6}>{layout.locale.toUpperCase()}</Button>
          </Popover>
        </nav>
      </nav>
      <WishlistMini visible={drawer === 'wishlist'} onClose={() => onSetDrawer()}>{null}</WishlistMini>
      <CartMini visible={drawer === 'cart'} onClose={() => onSetDrawer()}>{null}</CartMini>
    </header>
  )
}
