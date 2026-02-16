import React from "react";
import ReactMarkdown from "react-markdown";

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
    } | null;
}

export function EntryView({ entry }: EntryProps) {
    if (!entry) {
        return (
            <div className="py-12 text-center">
                <p className="ui-text text-taupe italic">No entries yet. Start writing today.</p>
            </div>
        );
    }

    return (
        <article className="space-y-6 animate-in fade-in duration-700">
            <header className="space-y-2 mb-8 border-b border-sand/50 pb-6">
                <time className="ui-text text-sm font-medium text-cinnamon uppercase tracking-wider block">
                    {formatDate(entry.entry_date)}
                </time>
                {entry.title && (
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso leading-tight">
                        {entry.title}
                    </h1>
                )}
            </header>

            <div className="prose prose-stone prose-lg max-w-none 
        prose-headings:font-serif prose-headings:text-espresso 
        prose-p:font-serif prose-p:text-espresso/90 prose-p:leading-loose
        prose-a:text-cinnamon prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-md prose-img:shadow-sm prose-img:w-full prose-img:border prose-img:border-sand
        prose-blockquote:border-l-cinnamon prose-blockquote:bg-sand/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
      ">
                <ReactMarkdown>{entry.content || ""}</ReactMarkdown>
            </div>
        </article>
    );
}
