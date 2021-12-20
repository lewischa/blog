import { YouTube } from 'mdx-embed';

export function YouTubeEmbed({ id }: { id: string }) {
    return (
        <div className="flex justify-center">
            <div className="w-11/12 flex flex-col">
                <p className="text-center">
                    <em>
                        Prefer to watch instead? Check out the&nbsp;
                        <a href={`https://youtu.be/${id}`}>
                            YouTube video
                        </a>
                        !
                    </em>
                </p>
                <div className="hidden sm:block">
                    <YouTube youTubeId={id} aspectRatio="16:9" />
                </div>
            </div>
        </div>
    );
}
