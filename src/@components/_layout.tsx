import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import Main from '@components/main/main';
import Meta from '@components/meta/meta';
import { Page } from '@geist-ui/core';
import Head from 'next/head';
import React from 'react';

export default function Layout({ page, children }) {
  return (
    <>
      <Head>
        <title>{page.meta.title}</title>
        <meta name="description" content={page.meta.description} />
        <meta name="keywords" content={page.meta.keywords} />
        <meta name="robots" content={page.meta.robots} />
        {page.alternates && page.alternates.map(alternate => (
          <link key={`${alternate.market}-${alternate.locale}`} rel="alternate" href={alternate.href} />
        ))}
      </Head>
      <Meta />
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
