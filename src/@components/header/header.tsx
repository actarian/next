import Container from '@components/container/container';
import { Stack } from '@strapi/design-system/Stack';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header({ menu }) {
  return (
    <header className={styles.header}>
      <Container>
        <Stack horizontal spacing={4}>
          {menu && menu.items.map((item, i) => (
            <Link key={i} href={item.slug}>{item.name}</Link>
          ))}
        </Stack>
        { /*
        <ul className={styles.menu}>
          {menu && menu.map((item, i) => (
            <li key={i}>
              <Link href={item.slug}>{item.name}</Link>
            </li>
          ))}
        </ul>
          */ }
      </Container>
    </header>
  )
}
