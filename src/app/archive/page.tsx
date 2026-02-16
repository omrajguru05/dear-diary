import { Calendar } from "@/components/Calendar";
import { getAllEntryDates } from "@/lib/db";

export const revalidate = 60;

export default async function ArchivePage() {
    const entries = await getAllEntryDates();

    return (
        <div className="py-8 animate-in fade-in duration-700">
            <h1 className="text-3xl font-serif font-bold text-espresso mb-8 text-center">Archive</h1>
            <p className="text-center text-taupe mb-12 ui-text text-sm">Select a date to view past entries.</p>

            <Calendar initialDate={new Date()} entries={entries || []} />
        </div>
    );
}
