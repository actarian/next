import { CssBaseline } from '@geist-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class CustomDocument extends Document {

  render() {
    // console.log(this.props);
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

  static async getInitialProps(context): Promise<any> {
    const initialProps = await Document.getInitialProps(context);
    const styles = CssBaseline.flush();
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    }
  }

}
