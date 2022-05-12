// import App from 'next/app'
import Router, { useRouter } from 'next/router';
import { useEffect } from "react";

let count = 0;

export default function CustomApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log('Component', Component);
  // console.log('pageProps', pageProps);
  // console.log('router', router);

  useEffect(() => {
    // console.log('useEffect', ++count);

    const onRouteChangeStart = async (url) => {
      console.log('App is changing to: ', url);
      // Component = dynamic(() => import('./index'));
    };

    Router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart);
    };

  }, []);

  return <Component {...pageProps} />
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
