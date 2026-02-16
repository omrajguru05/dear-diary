import { getLatestEntry } from "@/lib/db";
import { EntryView } from "@/components/EntryView";
import { ProfileHeader } from "@/components/ProfileHeader";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const latestEntry = await getLatestEntry();

  return (
    <div className="py-8 space-y-12">
      <ProfileHeader />
      <main>
        <EntryView entry={latestEntry} titleLink={true} />
      </main>
    </div>
  );
}
