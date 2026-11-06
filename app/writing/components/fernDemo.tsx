import FernCanvas from '@/app/ui/fernCanvas';

// The fern from the home page, small and upright, for use inside posts
export default function FernDemo({ points = 80000 }: { points?: number }) {
    return (
        <div className="post-demo" aria-hidden="true">
            <FernCanvas points={points} perFrame={400} frameClassName="post-demo-frame" />
        </div>
    );
}
