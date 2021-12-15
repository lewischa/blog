import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { MDXEmbedProvider } from 'mdx-embed';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import readingTime, { ReadTimeResults } from 'reading-time';
import { AnchorHTMLAttributes, BlockquoteHTMLAttributes, HtmlHTMLAttributes } from 'react';
import { YouTubeEmbed } from '@/components/YouTubeEmbed/YouTubeEmbed';
import { ViewCounter } from '@/components/ViewCounter/ViewCounter';

interface BlogPageProps {
    source: MDXRemoteSerializeResult;
    meta: {
        title: string;
        readingTime: ReadTimeResults;
        slug: string;
    };
}

const components = {
    h1: (props: HtmlHTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold my-4" {...props} />,
    h2: (props: HtmlHTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-bold my-4" {...props} />,
    p: (props: HtmlHTMLAttributes<HTMLParagraphElement>) => <p className="my-2" {...props} />,
    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-600 hover:text-blue-400" {...props} />,
    blockquote: (props: BlockquoteHTMLAttributes<HTMLParagraphElement>) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 ml-2" {...props} />,
    YouTubeEmbed: (props: { id: string }) => <YouTubeEmbed {...props} />
};

export default function BlogPost({ source, meta }: BlogPageProps) {
    return (
        <div className="px-12">
            <h1 className="text-3xl font-bold">{meta.title}</h1>
            <p className="text-gray-500">{meta.readingTime.text}</p>
            <ViewCounter slug={meta.slug} addView className="text-gray-500 mb-6" />
            <MDXEmbedProvider>
                <MDXRemote {...source} components={components} />
            </MDXEmbedProvider>
        </div>
    )
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<BlogPageProps>> {
    const slug = context.params?.slug as string;

    const blogSource = fs.readFileSync(path.join(process.cwd(), 'data', 'blogs', `${slug}.mdx`), { encoding: 'utf-8' });
    const {
        content,
        data
    } = matter(blogSource) as { content: string; data: { title?: string }};
    const title = data.title;

    if (!title) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const mdxSource = await serialize(content, { scope: data });

    return {
        props: {
            source: mdxSource,
            meta: {
                title,
                slug,
                readingTime: readingTime(blogSource)
            }
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const blogFiles = fs.readdirSync(path.join(process.cwd(), 'data/blogs'))
        .filter((filename) => filename.endsWith('.mdx'))
        .map((filename) => filename.replace('.mdx', ''));

    console.log('blog files:', blogFiles);
    return {
        paths: blogFiles.map((slug) => {
            return {
                params: {
                    slug
                }
            };
        }),
        fallback: false
    };
};
