import { useLayout } from '@hooks';
import { IRouteLink } from '@models';
import NextLink from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {

  const layout = useLayout();

  const items = layout.tree ? layout.tree.items : [];
  return (
    <div className={styles.footer}>
      {items && <FooterMenu items={items} />}
    </div>
  )
}

function FooterMenu({ items }: any) {
  return (
    <ul>
      {items && items.map((item: IRouteLink, i: number) => (
        <li key={`${item.title}-${i}`}>
          {item.href ? <NextLink href={item.href}>{item.title}</NextLink> : item.title}
          {(item.items && item.items.length ? <FooterMenu items={item.items} /> : null)}
        </li>
      ))}
    </ul>
  )
}

export interface FooterMenuProps {
  items: IRouteLink[];
}
