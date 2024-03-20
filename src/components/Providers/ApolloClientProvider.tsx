"use client";

import { getClient } from "@/utils/getClient";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { Session } from "next-auth";
import { ReactNode } from "react";

export const ApolloClientProvider = ({
    children,
    session,
}: {
    children: ReactNode;
    session: Session | null;
}) => {
    const client: ApolloClient<any> = getClient(session);

    return (
        client && <ApolloProvider client={client}>{children}</ApolloProvider>
    );
};
