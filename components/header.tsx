import Link from 'next/link';
import Container from './container';
import styles from './header.module.scss';

export default function Header({ menu }) {
  return (
    <header className={styles.header}>
      <Container>
        <ul className={styles.menu}>
          {menu && menu.map((item, i) => (
            <li key={i}>
              <Link href={item.slug}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  )
}
