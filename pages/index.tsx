import { Heading } from '@/components/Heading/Heading';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chad Lewis</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className="flex flex-col md:flex-row-reverse md:items-start md:justify-around">
                <div className="w-[60px] mb-4 md:w-[150px] md:mb-0">
                    <Image
                        src="https://avatars.githubusercontent.com/u/13987407?v=4"
                        alt="Avatar"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col">
                    <Heading>Chad Lewis</Heading>
                    <Heading variant="h4" className="mt-6 font-normal">
                        Front end engineer and aspiring JavaScript/TypeScript educator.
                    </Heading>
                </div>
            </div>
        </div>
    );
}
