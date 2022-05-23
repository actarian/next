import { Breadcrumbs, Spacer } from '@geist-ui/core';
import NextLink from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <>
      <Breadcrumbs>
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
