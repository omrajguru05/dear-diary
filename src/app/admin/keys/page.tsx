import { getAccessKeys } from "@/lib/keys-admin";
import { CreateKeyForm } from "@/components/admin/CreateKeyForm";
import { DeleteKeyButton } from "@/components/admin/DeleteKeyButton";
import { format } from "date-fns";

export const revalidate = 0;

export default async function AdminKeysPage() {
    const keys = await getAccessKeys();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-serif font-bold text-espresso">Access Keys</h1>

            <CreateKeyForm />

            <div className="bg-white/50 rounded-lg border border-sand overflow-hidden">
                <table className="w-full text-left bg-paper">
                    <thead className="bg-sand/30 border-b border-sand">
                        <tr>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider">Name</th>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider">PIN</th>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider">Created</th>
                            <th className="p-4 ui-text text-xs font-bold text-taupe uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/50">
                        {keys.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-taupe text-sm">No access keys found.</td>
                            </tr>
                        ) : (
                            keys.map((key) => (
                                <tr key={key.id} className="hover:bg-sand/10 transition-colors">
                                    <td className="p-4 ui-text text-sm font-medium text-espresso">
                                        {key.name}
                                    </td>
                                    <td className="p-4 font-mono text-sm text-espresso">
                                        {key.pin_code}
                                    </td>
                                    <td className="p-4 ui-text text-xs text-taupe">
                                        {format(new Date(key.created_at), "MMM d, yyyy")}
                                    </td>
                                    <td className="p-4 text-right">
                                        <DeleteKeyButton id={key.id} />
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
