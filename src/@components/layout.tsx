import Footer from '@components/footer';
import Header from '@components/header';
import Main from '@components/main';
import Meta from '@components/meta';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { darkTheme, lightTheme } from '@strapi/design-system/themes';
import React, { useState } from 'react';

export default function Layout({ menu, children }) {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <Meta />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Header menu={menu}></Header>
        <Main>{children}</Main>
        <Footer />
      </ThemeProvider>
    </>
  )
}
