import { Heading } from '@/components/Heading/Heading';
import { Link } from '@/components/Link/Link';
import { Constants } from 'lib/constants';
import { ReactNode } from 'react';

function Paragraph({ children }: { children: ReactNode }) {
    return (
        <p className="my-4 indent-8">
            {children}
        </p>
    );
}

export default function About() {
    return (
        <div>
            <Heading className="my-8">About Me</Heading>
            <Paragraph>
                Hey, my name is Chad Lewis. I work for Disney Streaming as a Senior Front End Software Engineer, and
                am an aspiring YouTuber, blogger, and JavaScript educator.
            </Paragraph>
            <Paragraph>
                I live in California with my fiancee Lizzy (&#128141; date: 06/26/2022 &#127881;), our German Shepherd Luana, and our two cats Cheye and
                Malcolm. We were fortunate enough to purchase a modest house at the very beginning of the pandemic,
                though we had to move nearly a hundred miles to afford it! It&apos;s taken
                a while, but we&apos;re adjusting just fine.
            </Paragraph>
            <Heading variant="h2" className="my-6">Creative Outlets</Heading>
            <Paragraph>
                I&apos;ve had the privilege of working on the Disney+ Smart TV app since its inception back in 2018. As
                more people joined the team I began to enjoy teaching others about the app, the ecosystem, and
                coding in general, but there&apos;s only so much to teach within the scope of my
                &quot;day job&quot;. I wanted to branch out! Thus, I created a <Link href={Constants.YouTubeChannelUrl}>YouTube channel</Link>.
                The channel allows me to push the boundaries of my experience to new levels, gives me a creative
                outlet, and lets me teach others what I learn along the way.
            </Paragraph>
            <Paragraph>
                If you happen to check out any of my videos, I hope you learn something cool and get inspired to try
                something new!
            </Paragraph>
            <Paragraph>
                YouTube has been a great learning experience so far, but I also wanted more of an informal
                &quot;playground&quot;, so to speak, to <em>really</em> dive into and learn new tools. A lot of the videos
                are one-and-done and don&apos;t allow for more
                long-term exploration. I&apos;d seen other coding YouTubers create their own websites, and it seemed like
                the perfect use case! I&apos;ve heard it called &quot;my own slice of the internet&quot; - and that&apos;s what this blog
                is: my own personal slice of the 21st century&apos;s online world, where I can do whatever I want,
                whenever I want. Pretty freeing!
            </Paragraph>
            <Heading variant="h2" className="my-6">Likes</Heading>
            <div>These are some of the things I enjoy in my free time, in no particular order:</div>
            <ul className="list-disc ml-8">
                <li>Spending time with friends and family</li>
                <li>SCUBA diving</li>
                <li>Coding (of course!)</li>
            </ul>
            <Heading variant="h2" className="my-6">What&apos;s Next?</Heading>
            <Paragraph>
                For now, no changes in sight for my current job, and I&apos;ll continue uploading YouTube videos
                (with accompanying blog posts here) to see where that takes me.
            </Paragraph>
        </div>
    );
}
