import DashboardContainer from "@/components/Dashboard/Layout/DashboardContainer";
import { ApolloClientProvider } from "@/components/Providers/ApolloClientProvider";
import { authOptions } from "@/constants/authOptions";
import "@/styles/app/dashboard/layout.scss";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <ApolloClientProvider session={session}>
            <DashboardContainer>{children}</DashboardContainer>
        </ApolloClientProvider>
    );
}
