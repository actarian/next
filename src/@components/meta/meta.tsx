import { usePage } from '@hooks';
import Head from 'next/head';

const origin = process.env.NEXT_PUBLIC_URL;

export default function Meta() {

  const page = usePage();

  return (
    <Head>
      <title>{page.meta?.title}</title>
      <meta name="description" content={page.meta?.description} />
      <meta name="keywords" content={page.meta?.keywords} />
      <meta name="robots" content={page.meta?.robots} />
      {page.href && <link rel="canonical" href={origin + page.href} />}
      {page.alternates && page.alternates.map(alternate => (
        <link key={`${alternate.marketId}-${alternate.localeId}`} rel="alternate" href={origin + alternate.id} />
      ))}
      {page.image && <meta property="og:image" content={origin + page.image} />}
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/head/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/head/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/head/favicon-16x16.png" />
      <link rel="manifest" href="/assets/head/site.webmanifest" />
      <link rel="mask-icon" href="/assets/head/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/assets/head/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/assets/head/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
    </Head>
  )
}
