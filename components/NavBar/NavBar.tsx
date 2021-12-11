import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { MobileMenu } from './MobileMenu';

export function NavBar() {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <nav className="mt-4 px-4 flex justify-end w-full relative">
            <MobileMenu />
            <ul className="hidden md:flex">
                <li className="list-none cursor-pointer">
                    <Link href="/">
                        <a className={`${pathname === '/' ? 'underline' : ''}`}>Home</a>
                    </Link>
                </li>
                <li className="list-none ml-2 cursor-pointer">
                    <Link href="/blog">
                        <a className={`${pathname === '/blog' ? 'underline' : ''}`}>Blog</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
