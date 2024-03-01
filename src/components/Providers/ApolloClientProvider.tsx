"use client";

import { getClient } from "@/utils/getClient";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/login");
        },
    });

    const client: ApolloClient<any> | undefined = session
        ? getClient(session)
        : undefined;

    return (
        client && <ApolloProvider client={client}>{children}</ApolloProvider>
    );
};
