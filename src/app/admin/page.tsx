import Link from "next/link";
import { getAdminEntries } from "@/lib/admin-db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { DeleteEntry } from "@/components/admin/DeleteEntry";

export const revalidate = 0; // Always fresh for admin

export default async function AdminDashboard() {
    const entries = await getAdminEntries();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-bold text-espresso">Dashboard</h1>
                <Link href="/admin/write">
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Write Entry
                    </Button>
                </Link>
            </div>

            <div className="bg-white/50 rounded-lg border border-sand overflow-hidden">
                <table className="w-full text-left bg-paper">
                    <thead className="bg-sand/30 border-b border-sand">
                        <tr>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider">Date</th>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider">Title</th>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/50">
                        {entries?.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-taupe text-sm">No entries yet.</td>
                            </tr>
                        ) : (
                            entries?.map((entry) => (
                                <tr key={entry.id} className="hover:bg-sand/10 transition-colors">
                                    <td className="p-4 ui-text text-sm font-medium text-espresso whitespace-nowrap">
                                        {format(new Date(entry.entry_date), "MMM d, yyyy")}
                                    </td>
                                    <td className="p-4 font-serif text-lg text-espresso truncate max-w-xs">
                                        <Link href={`/e/${entry.slug}`} target="_blank" className="hover:text-cinnamon transition-colors flex items-center gap-1 group">
                                            {entry.title || "Untitled"}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                                        </Link>
                                    </td>
                                    <td className="p-4 text-right flex items-center justify-end gap-2">
                                        <Link href={`/admin/edit/${entry.id}`} className="ui-text text-sm text-cinnamon hover:underline">
                                            Edit
                                        </Link>
                                        <DeleteEntry id={entry.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
