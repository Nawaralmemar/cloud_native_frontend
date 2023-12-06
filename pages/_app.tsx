import '../styles/globals.css';
import '../dist/output.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container lg:w-2/3 mx-auto w-11/12" theme-data="dark">
            <Component {...pageProps} />
        </div>
    );
}
