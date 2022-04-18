import { ColorModeScript } from '@chakra-ui/react';
// import crypto from 'crypto';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

// const cspHashOf = (text: string) => {
//   const hash = crypto.createHash('sha256');
//   hash.update(text);
//   return `'sha256-${hash.digest('base64')}'`;
// };

//  NOTE 오로지 SSR에서만 작동함.
export default class Document extends NextDocument {
  render() {
    // let csp = `default-src 'self'; script-src 'self' 'unsafe-inline' ${cspHashOf(NextScript.getInlineScriptSource(this.props))}`;
    // if (process.env.NODE_ENV !== 'production') {
    //   csp = `style-src 'self' 'unsafe-inline'; font-src 'self' data:; default-src 'self'; script-src 'unsafe-eval' 'self' 'unsafe-inline' ${cspHashOf(
    //     NextScript.getInlineScriptSource(this.props),
    //   )}`;
    // }

    return (
      <Html lang="ja">
        <Head>
          {/* <meta httpEquiv="Content-Security-Policy" content={csp} /> */}
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
          <link rel="icon" type="image/png" sizes="192x192" href="/image/icon/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/image/icon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/image/icon/favicon-32x32.png" />
          <link rel="shortcut icon" href="/image/icon/favicon.ico" />
          <link rel="apple-touch-icon" href="/image/icon/android-chrome-192x192.png" />
          {/* <link rel="icon" type="image/png" sizes="96x96" href="/images/icon/favicon-96x96.png" /> */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
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
