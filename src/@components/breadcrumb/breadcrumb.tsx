import { Breadcrumbs, Spacer } from '@geist-ui/core';
import { Github } from '@geist-ui/icons';
import NextLink from 'next/link';

export default function Breadcrumb(props) {
  return (
    <>
      <Breadcrumbs>
        <NextLink href="/">
          <Breadcrumbs.Item nextLink> <Github /> Home</Breadcrumbs.Item>
        </NextLink>
        <NextLink href="/en-us/components">
          <Breadcrumbs.Item nextLink>Components</Breadcrumbs.Item>
        </NextLink>
        <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
      </Breadcrumbs>
      <Spacer h={.5} />
    </>
  );
}
