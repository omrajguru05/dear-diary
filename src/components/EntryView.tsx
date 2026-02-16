import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

// Helper to format date cleanly
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

interface EntryProps {
    entry: {
        id: string;
        entry_date: string;
        title?: string;
        content?: string;
        slug?: string;
    } | null;
    titleLink?: boolean;
}

export function EntryView({ entry, titleLink = false, preview = false }: EntryProps & { preview?: boolean }) {
    if (!entry) {
        return (
            <div className="py-12 text-center">
                <p className="ui-text text-taupe italic">No entries yet.</p>
            </div>
        );
    }

    return (
        <article className="space-y-6 animate-in fade-in duration-700">
            <header className="space-y-2 mb-8 border-b border-sand/10 pb-6">
                <time className="ui-text text-sm font-medium text-cinnamon uppercase tracking-wider block">
                    {formatDate(entry.entry_date)}
                </time>
                {entry.title && (
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso leading-tight">
                        {titleLink && entry.slug ? (
                            <Link href={`/e/${entry.slug}`} className="hover:text-cinnamon transition-colors">
                                {entry.title}
                            </Link>
                        ) : (
                            entry.title
                        )}
                    </h1>
                )}
            </header>

            <div className={`relative ${preview ? "max-h-[400px] overflow-hidden" : ""}`}>
                <div className="prose prose-stone prose-lg max-w-none 
          prose-headings:font-serif prose-headings:text-espresso prose-headings:font-bold
          prose-p:font-body prose-p:text-espresso/90 prose-p:leading-loose prose-p:text-[19px] prose-p:mb-6
          prose-a:text-cinnamon prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2
          prose-img:rounded-xl prose-img:shadow-md prose-img:w-full prose-img:border prose-img:border-sand/20
          prose-blockquote:border-l-4 prose-blockquote:border-cinnamon/50 prose-blockquote:bg-sand/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-espresso/80
          prose-strong:text-espresso prose-strong:font-bold prose-strong:font-serif
          prose-li:text-espresso/90 prose-li:font-body
          prose-hr:border-sand/20
        ">
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>
                        }}
                    >
                        {entry.content || ""}
                    </ReactMarkdown>
                </div>

                {preview && (
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-0">
                        <Link
                            href={`/e/${entry.slug}`}
                            className="w-full h-full flex items-end justify-center pb-4 group"
                        >
                            <span className="ui-text text-cinnamon text-sm font-medium uppercase tracking-widest border-b border-cinnamon/30 pb-1 group-hover:border-cinnamon transition-all">
                                Read Entry
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
