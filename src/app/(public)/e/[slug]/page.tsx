import { getEntryBySlug } from "@/lib/db";
import { EntryView } from "@/components/EntryView";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
                <div className="mt-8">
                    <Link href="/" className="ui-text text-cinnamon hover:text-espresso transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="mb-8">
                <Link
                    href="/"
                    className="group inline-flex items-center text-sm font-medium text-taupe hover:text-cinnamon transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>
            <EntryView entry={entry} />
        </div>
    );
}
