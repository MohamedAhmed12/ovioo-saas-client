import "@/styles/app/unauth/layout.scss";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ApolloClientProvider } from "@/components/Providers/ApolloClientProvider";
import { authOptions } from "@/constants/authOptions";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <ApolloClientProvider session={session}>
            <main className="flex min-h-screen flex-col items-center justify-between main-layout">
                <NavBar />
                {children}
                <Footer />
                <Toaster position="top-right" />
            </main>
        </ApolloClientProvider>
    );
}
