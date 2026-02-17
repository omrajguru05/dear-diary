import { createClient } from "@/lib/supabase-server";

export async function getAccessKeys() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("access_keys")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching access keys:", error);
        return [];
    }
    return data;
}

export async function createAccessKey(name: string, pin: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("access_keys")
        .insert([{ name, pin_code: pin }])
        .select()
        .single();

    if (error) {
        console.error("Error creating access key:", error);
        throw new Error(error.message);
    }
    return data;
}

export async function deleteAccessKey(id: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("access_keys")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting access key:", error);
        throw new Error(error.message);
    }
    return true;
}
