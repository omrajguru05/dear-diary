import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-sand/20">
            <nav className="bg-paper border-b border-sand/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/admin" className="font-serif font-bold text-espresso text-xl">Admin</Link>
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="ui-text text-sm text-taupe hover:text-cinnamon transition-colors">Dashboard</Link>
                        <Link href="/admin/keys" className="ui-text text-sm text-taupe hover:text-cinnamon transition-colors">Access Keys</Link>
                    </div>
                </div>
                <div className="ui-text text-sm text-taupe"></div>
            </nav>
            <main className="max-w-4xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
