import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navigation />
            <main className="flex-1 w-full max-w-[650px] mx-auto px-4 sm:px-0">
                {children}
            </main>
            <Footer />
        </>
    );
}
