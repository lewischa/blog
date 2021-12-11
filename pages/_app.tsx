import { NavBar } from '@/components/NavBar/NavBar';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }: AppProps) {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
