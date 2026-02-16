import { createClient } from "@/lib/supabase-server";

export async function getAdminEntries() {
    const supabase = await createClient(); // Use server client

    const { data, error } = await supabase
        .from("entries")
        .select("id, entry_date, title, created_at")
        .order("entry_date", { ascending: false });

    if (error) {
        console.error("Error fetching entries:", error);
        return [];
    }

    return data;
}
