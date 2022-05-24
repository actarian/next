import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import Main from '@components/main/main';
import Meta from '@components/meta/meta';
import { Page } from '@geist-ui/core';
import React from 'react';

export default function Layout({ page, children }) {
  return (
    <>
      <Meta page={page} />
      <Page width="1024px" style={{ maxWidth: 'calc(100vw - 40px)', margin: '0 auto' }} padding={0}>
        <Page.Header>
          <Header page={page}></Header>
        </Page.Header>
        <Page.Content>
          <Main>{children}</Main>
        </Page.Content>
        <Page.Footer>
          <Footer />
        </Page.Footer>
      </Page>
    </>
  )
}
