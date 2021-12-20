import { PropsWithChildren } from 'react';

type Variants = 'h1' | 'h2' | 'h3' | 'h4';

const classNames: Record<Variants, string> = {
    h1: 'text-2xl font-bold md:text-3xl lg:text-5xl',
    h2: 'text-xl font-bold md:text-2xl lg:text-4xl',
    h3: 'text-lg font-bold md:text-xl lg:text-3xl',
    h4: 'text-md font-bold md:text-lg lg:text-2xl'
} as const;

interface HeadingProps {
    className?: string;
    variant?: Variants;
}

export function Heading({ className, children, variant = 'h1' }: PropsWithChildren<HeadingProps>) {
    const HeadingTag = variant;

    return (
        <HeadingTag className={`${classNames[variant]} ${className}`}>
            {children}
        </HeadingTag>
    );
}
