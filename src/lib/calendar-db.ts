import { createClient } from "@supabase/supabase-js";
import { startOfMonth, endOfMonth, format } from "date-fns";

export async function getEntriesForMonth(year: number, month: number) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    const { data, error } = await supabase
        .from("entries")
        .select("id, entry_date, title")
        .gte("entry_date", format(startDate, "yyyy-MM-dd"))
        .lte("entry_date", format(endDate, "yyyy-MM-dd"));

    if (error) {
        console.error("Error fetching monthly entries:", error);
        return [];
    }

    return data;
}
