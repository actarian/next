import { Breadcrumbs, Spacer } from '@geist-ui/core';
import NextLink from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <>
      <Breadcrumbs>
        { items.map((x, i) => (
          i < items.length - 1 ?
          <NextLink key={i} href={x.slug}>
            <Breadcrumbs.Item nextLink>{x.name}</Breadcrumbs.Item>
          </NextLink> :
          <Breadcrumbs.Item key={i}>{x.name}</Breadcrumbs.Item>
        )) }
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
