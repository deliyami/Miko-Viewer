import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

//  NOTE 오로지 SSR에서만 작동함.
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="jp">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index, follow" />
          {/* capable 주소줄 없애기 */}
          <meta key="googlebot" name="googlebot" content="index,follow" />
          <meta name="google" content="notranslate" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="keywords" content="concert, streaming, コンサート,ストリーミング" />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:site_name" content="Miko" />
          <meta property="og:title" content="Miko -  みんなのコンサート" />
          <meta property="og:description" content="インタラクティブコンサート体験" />
          <meta property="og:url" content="https://mikopj.live" />
          <meta
            property="og:image"
            content="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          />
          <meta property="twitter:card" content="Miko" />
          <meta property="twitter:url" content="https://mikopj.live" />
          <meta property="twitter:title" content="Miko - ミコ" />
          <meta property="twitter:description" content="みんなのコンサート" />
          <meta
            property="twitter:image"
            content="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          />
          {/*  temp  */}
          <meta name="theme-color" content="#39c5bb" />
          <link rel="icon" type="image/png" sizes="192x192" href="/images/icon/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/icon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/icon/favicon-32x32.png" />
          {/* <link rel="icon" type="image/png" sizes="96x96" href="/images/icon/favicon-96x96.png" /> */}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic&display=swap"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
