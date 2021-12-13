import { NavBar } from '@/components/NavBar/NavBar';
import { Footer } from '@/components/Footer/Footer';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-50">
            <header>
                <NavBar />
            </header>
            <main className="mx-6 md:mx-28 flex-grow">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
}

export default MyApp;
