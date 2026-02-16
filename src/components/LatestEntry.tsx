
import { getLatestEntry } from "@/lib/db";
import { EntryView } from "@/components/EntryView";

export async function LatestEntry() {
    // Add artificial delay for testing if needed, or remove for production speed
    // await new Promise((resolve) => setTimeout(resolve, 1000)); 

    const latestEntry = await getLatestEntry();
    return <EntryView entry={latestEntry} titleLink={true} preview={true} />;
}
