export function EntrySkeleton() {
    return (
        <article className="space-y-6 animate-blur-in">
            {/* Header skeleton */}
            <header className="space-y-2 mb-8 border-b border-sand/10 pb-6">
                <div className="h-4 w-32 rounded bg-sand/10" />
                <div className="h-10 w-3/4 rounded bg-sand/10" />
            </header>

            {/* Content skeleton */}
            <div className="space-y-6">
                <div className="h-4 w-full rounded bg-sand/10" />
                <div className="h-4 w-full rounded bg-sand/10" />
                <div className="h-4 w-5/6 rounded bg-sand/10" />
                <div className="h-4 w-full rounded bg-sand/10" />
                <div className="h-4 w-4/5 rounded bg-sand/10" />
                <div className="h-32 w-full rounded bg-sand/5 mt-8" />
            </div>
        </article>
    );
}

export function PostListSkeleton() {
    return (
        <div className="space-y-12 animate-blur-in">
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                    <div className="h-4 w-24 rounded bg-sand/10" />
                    <div className="h-8 w-1/2 rounded bg-sand/10" />
                    <div className="h-20 w-full rounded bg-sand/5" />
                </div>
            ))}
        </div>
    );
}
