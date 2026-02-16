export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-sand/20">
            <nav className="bg-paper border-b border-sand/10 px-6 py-4 flex items-center justify-between">
                <div className="font-serif font-bold text-espresso text-xl">Admin</div>
                <div className="ui-text text-sm text-taupe"></div>
            </nav>
            <main className="max-w-4xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
