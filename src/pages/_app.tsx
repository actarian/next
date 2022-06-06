// import App from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import LabelProvider from '@models/label/label.provider';
import { ILayout } from '@models/layout/layout';
import LayoutProvider from '@models/layout/layout.provider';
import { IPage } from '@models/page/page';
import PageProvider from '@models/page/page.provider';
import { IRouteParams } from '@models/route/route';
// import Router from 'next/router';
// import { useEffect } from "react";
import '../styles/styles.scss';

// let count = 0;

export default function CustomApp({ Component, pageProps }: CustomAppProps) {
  // const router = useRouter();
  // console.log('Component', Component);
  // console.log('pageProps', pageProps);
  // console.log('router', router);

  /*
  useEffect(() => {
    // console.log('useEffect', ++count);
    const onRouteChangeStart = async (url) => {
      console.log('App is changing to: ', url);
      // Component = dynamic(() => import('./index'));
    };
    const onRouteChangeError = async (url) => {
      console.log('App route error: ', url);
    };
    Router.events.on('routeChangeStart', onRouteChangeStart);
    Router.events.on('routeChangeError', onRouteChangeError);
    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart);
      Router.events.off('routeChangeError', onRouteChangeError);
    };
  }, []);
  */

  const { layout, page } = pageProps;

  if (!layout || !page) {
    return;
  }

  return (
    <LayoutProvider layout={layout}>
      <LabelProvider>
        <PageProvider page={page}>
          <GeistProvider themeType="dark">
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </PageProvider>
      </LabelProvider>
    </LayoutProvider>
  );
}

export type CustomAppProps = {
  Component: any;
  pageProps: {
    layout: ILayout,
    page: IPage,
    params: IRouteParams,
    [key: string]: any
  };
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

/*
export function reportWebVitals(metric) {
  console.log('App.reportWebVitals', metric);
}
*/

/*
import { CssBaseline, GeistProvider, Themes } from '@geist-ui/core';
import Router, { useRouter } from 'next/router';
import { useEffect } from "react";
import '../styles/styles.scss';

const customTheme = Themes.createFromDark({
  type: 'custom',
  palette: {
    // success: '#FF0',
  },
});

export default function CustomApp({ Component, pageProps }) {
  return (
    <GeistProvider themes={[customTheme]} themeType="custom">
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
*/
