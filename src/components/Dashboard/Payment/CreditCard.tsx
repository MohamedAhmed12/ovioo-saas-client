import { authOptions } from "@/constants/authOptions";
import { getClient } from "@/utils/getClient";
import { ApolloClient, gql } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import toast from "react-hot-toast";

const FETCH_USER_WITH_PROFILE = gql`
    query {
        me {
            teams {
                subscriptions {
                    remaining_credit_hours
                }
            }
        }
    }
`;

export default async function CreditCard() {
    const session = await getServerSession(authOptions);
    const client: ApolloClient<any> | undefined = getClient(session);

    const { data, error } = await client.query({
        query: FETCH_USER_WITH_PROFILE,
        fetchPolicy: "network-only",
    });

    if (error) {
        toast.error("Something went wrong!");
    }

    return (
        data?.me?.teams[0]?.subscriptions?.length > 0 && (
            <Card className="ovioo-card with-shadow min-w-[300px] max-w-[350px] rounded-[10px] my-6">
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        className="!text-[28px]"
                    >
                        Credit
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                        className="!my-5 !text-[45px]"
                    >
                        $
                        {
                            data.me.teams[0].subscriptions[0]
                                .remaining_credit_hours
                        }
                    </Typography>
                </CardContent>
            </Card>
        )
    );
}
