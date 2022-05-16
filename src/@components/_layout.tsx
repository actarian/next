import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import Main from '@components/main/main';
import Meta from '@components/meta/meta';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { darkTheme, lightTheme } from '@strapi/design-system/themes';
import React, { useState } from 'react';

export default function Layout({ header, children }) {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <Meta />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Header menu={header}></Header>
        <Main>{children}</Main>
        <Footer />
      </ThemeProvider>
    </>
  )
}
