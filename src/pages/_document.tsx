import { Head, Html, Main, NextScript } from 'next/document';
import React, { useState } from 'react';

export default function CustomDocument() {
  const [theme, setTheme] = useState('dark');
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
