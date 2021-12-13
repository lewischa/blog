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
    const isMatch = currentPath === path;

    return (
        <Link href={path}>
            <a
                className={`text-2xl border-b-2 ${isMatch ? 'border-slate-300' : 'border-transparent'} hover:border-slate-500`}
                onClick={onClick}
            >
                {linkText}
            </a>
        </Link>
    );
}

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const onNavItemClicked = useCallback(() => setIsOpen(false), [setIsOpen]);

    return (
        <div className="flex justify-end md:hidden w-full">
            <button
                className="relative w-6 h-6 z-20"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon
                    className={`absolute w-6 h-6 ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                />
                <XIcon
                    className={`absolute w-6 h-6 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                />
            </button>
            {isOpen &&
                <>
                    <div className="absolute flex flex-col items-center gap-6 w-full z-10 left-0 mt-6 h-screen bg-zinc-50">
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
                    </div>
                </>

            }
        </div>
    );
}