import { createClient } from "@supabase/supabase-js";

export async function getLatestEntry() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("entry_date", { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== "PGRST116") {
        // PGRST116 is "The result contains 0 rows" which is fine for empty state
        console.error("Error fetching latest entry:", error);
    }

    return data;
}

export async function getAllEntryDates() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
        .from("entries")
        .select("entry_date")
        .order("entry_date", { ascending: false });

    if (error) {
        console.error("Error fetching entry dates:", error);
        return [];
    }

    return data;
}

export async function getEntryByDate(date: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
        .from("entries")
        .select("*")
        .eq("entry_date", date)
        .single();

    if (error) {
        // console.error("Error fetching entry by date:", error);
        return null;
    }

    return data;
}
