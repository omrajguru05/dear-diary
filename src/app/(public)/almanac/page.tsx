import { getAllEntryDates } from "@/lib/db";
import { Calendar } from "@/components/Calendar";

export const metadata = {
    title: "Almanac | Entries Of Clock",
    description: "View entries in the almanac.",
};

export const revalidate = 60;

export default async function AlmanacPage() {
    const entries = await getAllEntryDates();

    return (
        <div className="py-8 space-y-8">
            <header className="space-y-2 border-b border-sand/10 pb-6">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso leading-tight">
                    Almanac
                </h1>
                <p className="ui-text text-taupe text-lg">
                    Browse entries by date.
                </p>
            </header>
            <div className="flex justify-center">
                <Calendar
                    initialDate={new Date()}
                    entries={entries || []}
                />
            </div>
        </div>
    );
}
