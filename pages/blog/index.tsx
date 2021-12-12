import Link from 'next/link';

import fs from 'fs';
import path from 'path';
import { GetStaticPropsResult } from 'next';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

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

const normalizeString = (str: string) => {
    return str.trim().toLowerCase();
};

export default function BlogPosts({ posts }: BlogPageProps) {
    const [searchString, setSearchString] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<PostInfo[]>([]);

    useEffect(() => {
        setFilteredPosts(
            searchString ? posts.filter(({ title }) => normalizeString(title).includes(normalizeString(searchString))) : posts
        );
    }, [posts, searchString]);

    return (
        <div className="px-12">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <div className="relative w-full mb-6">
                <input
                    className="w-full h-8 border border-gray-500 focus:outline-gray-700 rounded-md pl-4"
                    type="text"
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search by title"
                    value={searchString}
                />
                <SearchIcon className="absolute h-4 top-2 right-2 text-gray-400" />
            </div>
            <div className="flex flex-col gap-4">
                {filteredPosts.map((post) => {
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
                {!filteredPosts.length &&
                    <p>No blog posts found.</p>
                }
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
