import { Suspense } from "react";
import { LatestEntry } from "@/components/LatestEntry";
import { ProfileHeader } from "@/components/ProfileHeader";
import { EntrySkeleton } from "@/components/ui/skeletons";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="py-8 space-y-12">
      <ProfileHeader />
      <main>
        <Suspense fallback={<EntrySkeleton />}>
          <LatestEntry />
        </Suspense>
      </main>
    </div>
  );
}
