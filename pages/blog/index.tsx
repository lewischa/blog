import Link from 'next/link';

import fs from 'fs';
import path from 'path';
import { GetStaticPropsResult } from 'next';
import matter from 'gray-matter';
import readingTime from 'reading-time';

interface PostInfo {
    title: string;
    slug: string;
    byline: string;
    author: string;
    readingTime: string;
}

interface BlogPageProps {
    posts: PostInfo[];
}

export default function BlogPosts({ posts }: BlogPageProps) {
    return (
        <div className="px-12">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <div className="flex flex-col gap-4">
                {posts.map((post) => {
                    return (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.slug}
                        >
                            <a className="hover:scale-[1.03] transform transition-transform md:hover:scale-[1] group">
                                <div className="w-full bg-slate-200 px-4 py-4 rounded-lg md:bg-transparent md:rounded-none">
                                    <div className="flex flex-row justify-between items-baseline">
                                        <h4 className="text-md font-bold md:text-lg md:group-hover:underline">{post.title}</h4>
                                        <p className="text-slate-500">{post.author}</p>
                                    </div>
                                    <p className="text-slate-500">{post.readingTime} &bull; 1000 views</p>
                                    <p className="mt-4">{post.byline}</p>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BlogPageProps>> {
    const blogFileNames = fs.readdirSync(path.join(process.cwd(), 'data/blogs'))
        .filter((filename) => filename.endsWith('.mdx'));
    const posts: PostInfo[] = blogFileNames.reduce((allPosts, fileName) => {
        const blogSource = fs.readFileSync(path.join(process.cwd(), 'data/blogs/', fileName), { encoding: 'utf-8'});
        const readingTimeResult = readingTime(blogSource);
        const { data } = matter(blogSource);

        if ((data.readyToPublish && process.env.NODE_ENV === 'production') || process.env.NODE_ENV !== 'production') {
            allPosts.push({
                author: data.author,
                byline: data.byline,
                readingTime: readingTimeResult.text,
                slug: fileName.replace('.mdx', ''),
                title: data.title
            });
        }

        return allPosts;
    }, [] as PostInfo[]);

    return {
        props: {
            posts
        }
    };
}
