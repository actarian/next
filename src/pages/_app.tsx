import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { ILayout, IPage, IRouteParams, LabelProvider, LayoutProvider, PageProvider } from '@models/index';
import '../styles/styles.scss';

export default function CustomApp({ Component, pageProps }: CustomAppProps) {

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

/*
export function reportWebVitals(metric) {
  console.log('App.reportWebVitals', metric);
}
*/
