import { getEntryByDate } from "@/lib/db";
import { EntryView } from "@/components/EntryView";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ date: string }>;
}

export const revalidate = 60;

export default async function EntryPage({ params }: PageProps) {
    const { date } = await params;
    const entry = await getEntryByDate(date);

    if (!entry) {
        // Optionally show a custom "No entry for this date" or just 404
        // 404 is semantically correct for an archival link that doesn't exist
        // But for a diary, maybe a soft 404 is better?
        // Let's stick to EntryView handling null, or redirect.
        // EntryView handles null, but if accessing /post/2024-01-01 directly, users expect something.
        return (
            <div className="py-12 text-center">
                <h1 className="text-2xl font-serif text-espresso mb-4">No Entry Found</h1>
                <p className="ui-text text-taupe">There is no entry for {date}.</p>
            </div>
        );
    }

    return (
        <div className="py-8">
            <EntryView entry={entry} />
        </div>
    );
}
