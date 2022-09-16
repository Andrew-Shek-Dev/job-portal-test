import { AppProps } from 'next/app';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Router from 'next/router';

Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function CustomApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default CustomApp;
