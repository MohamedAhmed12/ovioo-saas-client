"use client";

import LeftSideCover from "@/components/Auth/LeftSideCover";
import { ApolloClientProvider } from "@/components/Providers/ApolloClientProvider";
import "@/styles/app/auth/layout.scss";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PublicLayout({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("error");
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/login");
        },
    });

    useEffect(() => {
        if (callbackUrl) {
            toast.error("Something went wrong!");
        }
    }, [callbackUrl]);

    return (
        <ApolloClientProvider session={session}>
            <main className="flex min-h-screen flex-col justify-between auth-layout">
                <div className="login flex w-full">
                    <LeftSideCover />
                    <div className="form__wrapper flex flex-1 bg-white text-black py-24 px-5 lg:px-0">
                        {children}
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                style: {
                                    maxWidth: 600,
                                },
                            }}
                        />
                    </div>
                </div>
            </main>
        </ApolloClientProvider>
    );
}
