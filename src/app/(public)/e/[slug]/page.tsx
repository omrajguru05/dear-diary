import { getEntryBySlug } from "@/lib/db";
import { EntryView } from "@/components/EntryView";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function EntryPage({ params }: PageProps) {
    const { slug } = await params;
    const entry = await getEntryBySlug(slug);

    if (!entry) {
        return (
            <div className="py-12 text-center">
                <h1 className="text-2xl font-serif text-espresso mb-4">No Entry Found</h1>
                <p className="ui-text text-taupe">There is no entry at this address.</p>
            </div>
        );
    }

    return (
        <div className="py-8">
            <EntryView entry={entry} />
        </div>
    );
}
