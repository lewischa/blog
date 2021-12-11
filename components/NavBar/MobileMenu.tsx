import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

interface MobileNavItemProps {
    currentPath: string;
    path: string;
    linkText: string;
    onClick: () => void;
}

function MobileNavItem({ currentPath, path, linkText, onClick }: MobileNavItemProps) {
    return (
        <li className={`border-l-4 ${currentPath === path ? 'border-gray-300' : 'border-transparent'} list-none cursor-pointer pl-2`}>
            <Link href={path}>
                <a className="no-underline hover:underline" onClick={onClick}>{linkText}</a>
            </Link>
        </li>
    );
}

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const onNavItemClicked = useCallback(() => setIsOpen(false), [setIsOpen]);

    return (
        <div className="flex justify-end md:hidden w-full">
            {!isOpen &&
                <button onClick={() => {
                    setIsOpen(true);
                }}>
                    <MenuIcon className="w-6 h-6" />
                </button>
            }
            {isOpen &&
                <>
                    <button onClick={() => setIsOpen(false)}>
                        <XIcon className="w-6 h-6" />
                    </button>
                    <ul className="absolute mt-6 bg-white">
                        <MobileNavItem
                            currentPath={pathname}
                            path="/"
                            linkText="Home"
                            onClick={onNavItemClicked}
                        />
                        <MobileNavItem
                            currentPath={pathname}
                            path="/blog"
                            linkText="Blog"
                            onClick={onNavItemClicked}
                        />
                    </ul>
                </>

            }
        </div>
    );
}