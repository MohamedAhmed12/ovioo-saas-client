"use client";

import { getClient } from "@/utils/getClient";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { UseSessionOptions, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const ApolloClientProvider = ({
    children,
    required,
}: {
    children: ReactNode;
    required: boolean;
}) => {
    const sessionParams: UseSessionOptions<boolean> = { required };

    if (required) {
        sessionParams.onUnauthenticated = () => {
            redirect("/auth/login");
        };
    }

    const { data: session } = useSession(sessionParams);
    const client: ApolloClient<any> = getClient(session);

    return (
        client && <ApolloProvider client={client}>{children}</ApolloProvider>
    );
};
