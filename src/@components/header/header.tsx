import CartMini from '@components/cart-mini/cart-mini';
import { Button, Image, Tabs } from '@geist-ui/core';
import { ShoppingCart } from '@geist-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import styles from './header.module.scss';

export default function Header({ menu }) {
  const router = useRouter();

  const [active, setActive] = useState(false);

  const brand = 'Brand Name';
  const locale = '';
  const currentTab = '';

  const onTabChange = useCallback((tab: string) => {
    const shouldRedirect = tab !== currentTab;
    if (!shouldRedirect) {
      return;
    }
    const pathname = `${tab}`;
    router.push(pathname);
  }, [currentTab, locale]);

  return (
    <header className={styles.header}>
      { /*
        <Stack horizontal spacing={4}>
          {menu && menu.items.map((item, i) => (
            <NextLink key={i} href={item.slug}>{item.name}</NextLink>
          ))}
        </Stack>
        */ }
      { /*
        <ul className={styles.menu}>
          {menu && menu.map((item, i) => (
            <li key={i}>
              <NextLink href={item.slug}>{item.name}</NextLink>
            </li>
          ))}
        </ul>
          */ }


      <nav className={styles.menu}>

        <NextLink href={`/`}>
          <a aria-label="Go Home" className={styles.logo}>
            <Image src="/assets/header/logo.png" width="30px" height="30px" mr={0.5} draggable={false} title={brand} />{brand}
          </a>
        </NextLink>

        {menu &&
          <Tabs leftSpace={0} activeClassName="current" align="center" hideDivider hideBorder value={currentTab} onChange={onTabChange}>
            {menu.items.map((item, i) => (
              <Tabs.Item font="14px" label={item.name} value={item.slug} key={`${item.name}-${i}`} />
            ))}
          </Tabs>
        }

        <Button icon={<ShoppingCart />} auto scale={2 / 3} px={0.6} onClick={() => setActive(true)}></Button>
      </nav>
      <CartMini children={null} active={active} setActive={setActive}></CartMini>
    </header>
  )
}
