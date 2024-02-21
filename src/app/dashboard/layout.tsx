import DashboardContainer from "@/components/Dashboard/Layout/DashboardContainer";
import { ApolloClientProvider } from "@/components/Providers/ApolloClientProvider";
import "@/styles/app/dashboard/layout.scss";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ApolloClientProvider>
            <DashboardContainer>{children}</DashboardContainer>
        </ApolloClientProvider>
    );
}
