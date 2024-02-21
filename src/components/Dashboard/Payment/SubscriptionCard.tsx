import { authOptions } from "@/constants/authOptions";
import { getClient } from "@/utils/getClient";
import { ApolloClient, gql } from "@apollo/client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import Link from "next/link";
import toast from "react-hot-toast";

const cardNumbers = 1234;
const GET_MANAGE_SUBS_URL = gql`
    query GetManageSubscriptionURL {
        getManageSubscriptionURL
    }
`;
export default async function SubscriptionCard() {
    const session = await getServerSession(authOptions);
    const client: ApolloClient<any> | undefined = getClient(session);

    const { data: manageSubURLData, error: manageSubURLErr } =
        await client.query({
            query: GET_MANAGE_SUBS_URL,
        });

    if (manageSubURLErr) {
        toast.error("Something went wrong!");
    }

    return (
        manageSubURLData && (
            <Card className="ovioo-card with-shadow min-w-[300px] max-w-[580px] rounded-[10px] my-6">
                <CardContent>
                    <span className="flex justify-between items-center mb-8">
                        <Typography variant="h5" component="div">
                            Current Plan
                            <span className="capitalize text-slate-400 ml-1">
                                (standard)
                            </span>
                        </Typography>
                        <Link
                            href={manageSubURLData.getManageSubscriptionURL}
                            className="text-base text-sm text-slate-400 capitalize p-2 hidden md:flex text-wrap hover:text-white"
                        >
                            manage subscription
                        </Link>
                    </span>
                    <span className="!text-5xl">
                        <Typography style={{ marginBottom: 4 }} variant="h6">
                            card number
                        </Typography>
                        <Typography variant="subtitle1">
                            **** **** **** {cardNumbers}
                        </Typography>
                    </span>
                </CardContent>
                <CardActions className="flex-col !items-start justify-start !p-4">
                    <Link
                        // size="small"
                        href={manageSubURLData.getManageSubscriptionURL}
                        className="hover:bg-transparent dashboard__link !font-[800] !p-0"
                    >
                        Replace credit card
                    </Link>
                    <Link
                        // size="small"
                        href={manageSubURLData.getManageSubscriptionURL}
                        className="hover:bg-transparent dashboard__link !font-[800] !p-0 !pt-1 !m-0"
                    >
                        View Transactions
                    </Link>
                </CardActions>
            </Card>
        )
    );
}
