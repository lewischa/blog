import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <div className="flex md:hidden flex-col">
            {!isOpen &&
                <button onClick={() => {
                    setIsOpen(true);
                }}>
                    Menu Icon
                </button>
            }
            {isOpen &&
                <>
                    <button onClick={() => setIsOpen(false)}>Close Menu</button>
                    <ul>
                        <li className="list-none cursor-pointer">
                            <Link href="/">
                                <a onClick={() => setIsOpen(false)} className={`${pathname === '/' ? 'underline' : ''}`}>Home</a>
                            </Link>
                        </li>
                        <li className="list-none ml-2 cursor-pointer">
                            <Link href="/blog">
                                <a onClick={() => setIsOpen(false)} className={`${pathname === '/blog' ? 'underline' : ''}`}>Blog</a>
                            </Link>
                        </li>
                    </ul>
                </>

            }
        </div>
    );
}

export function NavBar() {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <nav className="mt-4 px-4 flex justify-end w-full">
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
