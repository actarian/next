import { Breadcrumbs, Spacer } from '@geist-ui/core';
import { IRouteLink } from '@models';
import NextLink from 'next/link';
import styles from './breadcrumb.module.scss';

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // console.log('Breadcrumb', items);
  return (
    <>
      <Breadcrumbs className={styles.breadcrumbs}>
        {items.map((x, i) => (
          i < items.length - 1 && x.href ?
            <NextLink key={i} href={x.href}>
              <Breadcrumbs.Item nextLink>{x.title}</Breadcrumbs.Item>
            </NextLink> :
            <Breadcrumbs.Item key={i}>{x.title}</Breadcrumbs.Item>
        ))}
        { /*
        <NextLink href="/">
          <Breadcrumbs.Item nextLink> <Github /> Home</Breadcrumbs.Item>
        </NextLink>
        <NextLink href="/en-us/components">
          <Breadcrumbs.Item nextLink>Components</Breadcrumbs.Item>
        </NextLink>
        <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
        */ }
      </Breadcrumbs>
      <Spacer h={.5} />
    </>
  );
}

export type BreadcrumbProps = {
  items: IRouteLink[];
};
