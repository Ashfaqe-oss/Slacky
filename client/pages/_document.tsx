import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="Best Chat app in the world" />      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}