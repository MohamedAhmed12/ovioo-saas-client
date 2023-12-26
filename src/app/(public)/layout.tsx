import "@/styles/app/unauth/layout.scss";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "#1 Design Platform To Cover All Your Business Needs - Ovioo",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between main-layout">
            <NavBar />
            {children}
            <Footer />
            <Toaster position="top-right" />
        </main>
    );
}
