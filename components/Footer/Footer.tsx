import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

export function Footer() {
    return (
        <footer className="w-full bg-slate-300 px-6 py-6 md:px-28">
            <div className="flex justify-around">
                <div className="flex flex-col gap-6 text-center">
                    <p className="text-black font-bold">Site Links</p>
                    <Link href="/">
                        <a className="cursor-pointer">Home</a>
                    </Link>
                    <Link href="/about">
                        <a className="cursor-pointer">About</a>
                    </Link>
                </div>
                <div className="flex flex-col gap-6 text-center">
                    <p className="text-black font-bold">Social</p>
                    <div className="flex gap-2">
                        <SocialIcon
                            url="https://www.youtube.com/channel/UCMhqMbMDSdXHbDw648f1W2g"
                                // Social icons don't allow size styling by class name :(
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem'
                                }}
                                />
                        <SocialIcon
                            url="https://github.com/lewischa"
                            // Social icons don't allow size styling by class name :(
                            style={{
                                width: '2.5rem',
                                height: '2.5rem'
                            }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
