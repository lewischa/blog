import { NavBar } from '@/components/NavBar/NavBar';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
