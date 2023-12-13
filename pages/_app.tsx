import '../styles/globals.css';
import '../dist/output.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container lg:w-2/3 mx-auto w-11/12" data-theme="dark">
            <Component {...pageProps} />
        </div>
    );
}
