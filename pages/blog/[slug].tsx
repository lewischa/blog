import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { MDXEmbedProvider } from 'mdx-embed';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import readingTime, { ReadTimeResults } from 'reading-time';
import { HTMLAttributes } from 'react';
import { YouTubeEmbed } from '@/components/YouTubeEmbed/YouTubeEmbed';
import { ViewCounter } from '@/components/ViewCounter/ViewCounter';
import Image, { ImageProps } from 'next/image';

interface BlogPageProps {
    source: MDXRemoteSerializeResult;
    meta: {
        title: string;
        readingTime: ReadTimeResults;
        slug: string;
    };
}

const components = {
    YouTubeEmbed: (props: { id: string }) => <YouTubeEmbed {...props} />,
    Image: (props: ImageProps) => <Image alt="blog image" {...props} />,
    code: (props: HTMLAttributes<HTMLPreElement>) => {
        const language = props.className?.replace('language-', '') ?? 'javascript';
        const showLineNumbers = language !== 'bash';
        console.log('code props:', props);
        return <SyntaxHighlighter showLineNumbers={showLineNumbers} style={okaidia} language={language} {...props} />;
    }
};

export default function BlogPost({ source, meta }: BlogPageProps) {
    return (
        <article className="flex justify-center w-full pt-6">
            <div className="
                prose
                md:prose-lg
                lg:prose-xl
                prose-a:text-blue-600
                hover:prose-a:text-blue-400
                prose-code:bg-gray-200
                prose-code:text-red-500
                prose-code:before:content-['']
                prose-code:after:content-['']
                prose-pre:bg-transparent
                prose-pre:py-0
                prose-pre:my-0
                md:prose-pre:py-0
                md:prose-pre:my-0
                lg:prose-pre:py-0
                lg:prose-pre:my-0
            ">
                <div className="prose-h1:mb-4 md:prose-h1:mb-6 lg:prose-h1:mb-8">
                    <h1 className="text-3xl font-bold">{meta.title}</h1>
                </div>
                <div className="prose-p:my-0 md:prose-p:my-0 lg:prose-p:my-0">
                    <p className="text-gray-500">{meta.readingTime.text}</p>
                </div>
                <ViewCounter slug={meta.slug} addView className="not-prose text-gray-500 mb-6" />
                <MDXEmbedProvider>
                    <MDXRemote {...source} components={components} />
                </MDXEmbedProvider>
            </div>
        </article>
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
