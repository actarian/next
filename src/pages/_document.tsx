import { CssBaseline } from '@geist-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(context: any): Promise<any> {
    const initialProps = await Document.getInitialProps(context);
    const styles = CssBaseline.flush();
    return {
      ...initialProps,
      styles: (
        <>
          {styles}
          {initialProps.styles}
        </>
      ),
    }
  }

}
