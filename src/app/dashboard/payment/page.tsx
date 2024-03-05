import CreditCard from "@/components/Dashboard/Payment/CreditCard";
import SubscriptionCard from "@/components/Dashboard/Payment/SubscriptionCard";
import { authOptions } from "@/constants/authOptions";
import { getClient } from "@/utils/getClient";
import { ApolloClient, gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import toast from "react-hot-toast";

const FETCH_USER_WITH_PROFILE = gql`
    query {
        me {
            teams {
                card_last4
                subscriptions {
                    remaining_credit_hours
                }
            }
        }
    }
`;
const GET_MANAGE_SUBS_URL = gql`
    query GetManageSubscriptionURL {
        getManageSubscriptionURL
    }
`;

export default async function Payment() {
    const session = await getServerSession(authOptions);
    const client: ApolloClient<any> | undefined = getClient(session);

    const { data, error } = await client.query({
        query: FETCH_USER_WITH_PROFILE,
        fetchPolicy: "network-only",
    });

    const { data: mangeSubURLData, error: mangeSubURLErr } = await client.query(
        {
            query: GET_MANAGE_SUBS_URL,
        }
    );

    if (error || mangeSubURLErr) {
        toast.error("Something went wrong!");
    }

    return (
        data?.me?.teams?.[0] &&
        mangeSubURLData && (
            <div className="dashboard-payment">
                <CreditCard subscription={data.me.teams[0].subscriptions[0]} />
                <SubscriptionCard
                    mangeSubURLData={mangeSubURLData}
                    team={data.me.teams[0]}
                />
            </div>
        )
    );
}
