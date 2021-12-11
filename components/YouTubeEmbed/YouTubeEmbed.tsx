import { YouTube } from 'mdx-embed';

export function YouTubeEmbed({ id }: { id: string }) {
    return (
        <div className="flex justify-center">
            <div className="w-4/5">
                <YouTube youTubeId={id} />
                <p><em>Prefer to watch instead? Check out the video version!</em></p>
            </div>
        </div>
    );
}
