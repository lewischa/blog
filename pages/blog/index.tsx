import Link from 'next/link';

import fs from 'fs';
import path from 'path';

interface BlogPageProps {
    slugs: string[];
}

export default function TestPage({ slugs }: BlogPageProps) {
    return (
        <div className="px-12">
            <h1 className="text-3xl font-bold">This is the blog page</h1>
            <div className="flex flex-col">
                {slugs.map((slug) => {
                    return (
                        <div key={slug}>
                            <Link
                                href={`/blog/${slug}`}
                            >
                                {slug}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const slugs = fs.readdirSync(path.join(process.cwd(), 'data/blogs'))
        .filter((filename) => filename.endsWith('.mdx'))
        .map((filename) => filename.replace('.mdx', ''));

    return {
        props: {
            slugs
        }
    };
}
