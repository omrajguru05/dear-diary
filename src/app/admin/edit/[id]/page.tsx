import { Editor } from "@/components/admin/Editor";
import { createClient } from "@/lib/supabase-server"; // Use server client to fetch initial data

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: entry } = await supabase
        .from("entries")
        .select("*")
        .eq("id", id)
        .single();

    if (!entry) {
        return <div>Entry not found</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-serif font-bold text-espresso">Edit Entry</h1>
            <Editor initialData={entry} />
        </div>
    );
}
