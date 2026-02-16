"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upload } from "@vercel/blob/client";
import { ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateSlug } from "@/lib/slug";

interface EditorProps {
    initialData?: {
        id?: string;
        title: string;
        content: string;
        entry_date: string;
        slug?: string;
    };
}

export function Editor({ initialData }: EditorProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [date, setDate] = useState(initialData?.entry_date || new Date().toISOString().split('T')[0]);

    const [isUploading, setIsUploading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            const entryData = {
                title,
                content,
                entry_date: date,
                slug: initialData?.slug || generateSlug(6),
            };

            let error;

            if (initialData?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from("entries")
                    .update(entryData)
                    .eq("id", initialData.id);
                error = updateError;
            } else {
                // Create
                const { error: insertError } = await supabase
                    .from("entries")
                    .insert([entryData]);
                error = insertError;
            }

            if (error) throw error;

            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            alert("Error saving entry: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsUploading(true);

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });

            const imageMarkdown = `\n![${file.name}](${newBlob.url})\n`;
            setContent(prev => prev + imageMarkdown);
        } catch (err: any) {
            console.error(err);
            alert("Upload failed. Blob might not be configured yet. \n" + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="font-mono text-sm bg-sand/10 border-sand/20 focus:border-cinnamon focus:ring-cinnamon/20 text-espresso"
                />
                <Input
                    type="text"
                    placeholder="Title (Optional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-serif font-bold text-lg bg-sand/10 border-sand/20 focus:border-cinnamon focus:ring-cinnamon/20 text-espresso placeholder:text-taupe/50"
                />
            </div>

            <div className="relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your day..."
                    className={cn(
                        "w-full h-96 p-6 rounded-xl border border-sand/20 bg-sand/5 text-espresso/90 font-body text-lg leading-loose resize-y focus:outline-none focus:ring-2 focus:ring-cinnamon/20 focus:border-cinnamon transition-all duration-300",
                        "placeholder:text-taupe/30"
                    )}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <label className="cursor-pointer p-2 bg-white/10 hover:bg-white/20 rounded-full shadow-sm border border-sand/20 transition-all text-taupe hover:text-cinnamon">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                        {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={() => router.back()}>Cancel</Button>
                <Button onClick={handleSave} disabled={loading || isUploading || !title.trim()}>
                    {loading ? "Saving..." : "Publish"}
                </Button>
            </div>
        </div>
    );
}
