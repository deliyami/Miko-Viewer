import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          {/* <Suspense fallback={<Box>로딩</Box>}> */}
          <Main />
          {/* </Suspense> */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
