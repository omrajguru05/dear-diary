import { ArrowLeft } from "lucide-react";

export default function Loading() {
    return (
        <div className="py-8 animate-pulse">
            {/* Back button skeleton */}
            <div className="mb-8 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-sand/10" />
                <div className="h-4 w-24 rounded bg-sand/10" />
            </div>

            <article className="space-y-6">
                {/* Header skeleton */}
                <header className="space-y-4 mb-8 border-b border-sand/5 pb-6">
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
                </div>
            </article>
        </div>
    );
}
