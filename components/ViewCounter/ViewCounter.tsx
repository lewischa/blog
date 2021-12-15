import { EyeIcon } from '@heroicons/react/outline';
import fetcher from 'lib/fetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
export function ViewCounter({ addView, className, slug }: { addView?: boolean; className?: string; slug: string }) {
    const { data } = useSWR<{ total: number }>(`/api/blog/views/${slug}`, fetcher);

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/blog/views/${slug}`, {
                method: 'POST'
            });
    
            if (addView) {
                registerView();
            }
      }, [slug, addView]);

    return (
        <div className={`flex gap-1 items-center ${className}`}>
            <EyeIcon className="w-5 h-5" />
            <div>{data?.total ?? 0} views</div>
        </div>
    );
}
