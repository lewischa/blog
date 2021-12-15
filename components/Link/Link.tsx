import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

export function Link({ href, children }: PropsWithChildren<{ href: string }>) {
    return (
        <NextLink href={href}>
            <a className="text-blue-600 hover:text-blue-400">
                {children}
            </a>
        </NextLink>
    );
}
