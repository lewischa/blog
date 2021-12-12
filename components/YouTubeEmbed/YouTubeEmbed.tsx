import { YouTube } from 'mdx-embed';

export function YouTubeEmbed({ id }: { id: string }) {
    return (
        <div className="flex justify-center">
            <div className="w-4/5 flex flex-col">
                <div className="hidden md:block">
                    <YouTube youTubeId={id} aspectRatio="16:9" />
                </div>
                <p className="text-center md:text-left">
                    <em>
                        Prefer to watch instead? Check out the&nbsp;
                        <a
                            href={`https://youtu.be/${id}`}
                            className="text-blue-600 hover:text-blue-400"
                        >
                            YouTube video
                        </a>
                        !
                    </em>
                </p>
            </div>
        </div>
    );
}
