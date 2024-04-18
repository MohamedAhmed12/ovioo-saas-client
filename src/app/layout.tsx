import { NextAuthProvider } from "@/components/Providers/NextAuthProvider";
import { ReduxProvider } from "@/components/Providers/ReduxProvider";
import "@/styles/app/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { Rubik } from "next/font/google";
import { ReactNode } from "react";

const rubik = Rubik({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "700"],
    fallback: ["sans-serif"],
    variable:'--font-rubik'
});

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <ReduxProvider>
            <NextAuthProvider>
                <html lang="en">
                    <link rel="icon" href="/svg/logo.svg" />
                    <body className={rubik.className}>
                        {children}
                        <Analytics />
                    </body>
                </html>
            </NextAuthProvider>
        </ReduxProvider>
    );
}
