/*
How to solve styled-component error under Next.js(SSR)?
Method 1: add _document.tsx
Method 2: add  compiler: {
        styledComponents: true,
    }@ next.config.js

Reference:
https://github.com/styled-components/styled-components/issues/3634
https://nextjs.org/docs/advanced-features/compiler#styled-components
 */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  //https://stackoverflow.com/questions/66587775/preloading-a-css-file-with-nextjs
  //https://stackoverflow.com/questions/49674092/preloading-font-with-rel-preload
  /*render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="prefetch"
            href="https://dummyjson.com/products?limit=10&skip=0&select=title,price"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }*/

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
