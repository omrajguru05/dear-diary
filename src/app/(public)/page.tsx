import { Suspense } from "react";
import { getAllEntries } from "@/lib/db";
import { EntryView } from "@/components/EntryView";
import { ProfileHeader } from "@/components/ProfileHeader";
import { EntrySkeleton } from "@/components/ui/skeletons";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const entries = await getAllEntries();

  return (
    <div className="py-8 space-y-12">
      <ProfileHeader />
      <main className="space-y-16">
        <Suspense fallback={<EntrySkeleton />}>
          {entries && entries.length > 0 ? (
            entries.map((entry: any) => (
              <EntryView key={entry.id} entry={entry} titleLink={true} preview={true} />
            ))
          ) : (
            <p className="ui-text text-taupe italic text-center">No entries found.</p>
          )}
        </Suspense>
      </main>
    </div>
  );
}
