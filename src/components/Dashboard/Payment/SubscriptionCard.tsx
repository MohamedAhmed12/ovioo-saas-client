"use client";

import { useAppSelector } from "@/hooks/redux";
import { Team } from "@/interfaces";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function SubscriptionCard({
    mangeSubURLData,
    team,
}: {
    mangeSubURLData: { getManageSubscriptionURL: string };
    team: Team;
}) {
    const authUser = useAppSelector((state) => state.userReducer.user);

    return (
        <Card className="ovioo-card with-shadow min-w-[300px] max-w-[580px] rounded-[10px] my-6">
            <CardContent>
                <span className="flex justify-between items-center mb-8">
                    <Typography variant="h5" component="div">
                        Current Plan
                        <span className="capitalize text-slate-400 ml-1">
                            ({
                                authUser?.teams?.[0]?.subscriptions?.[0]?.plan
                                    ?.title
                            })
                        </span>
                    </Typography>
                    <Link
                        href={mangeSubURLData.getManageSubscriptionURL}
                        className="text-base text-sm text-slate-400 capitalize p-2 hidden md:flex text-wrap hover:text-white"
                    >
                        manage subscription
                    </Link>
                </span>

                {team?.card_last4 && (
                    <span className="!text-5xl">
                        <Typography style={{ marginBottom: 4 }} variant="h6">
                            card number
                        </Typography>
                        <Typography variant="subtitle1">
                            **** **** **** {team.card_last4}
                        </Typography>
                    </span>
                )}
            </CardContent>
            <CardActions className="flex-col !items-start justify-start !p-4">
                <Link
                    href={mangeSubURLData.getManageSubscriptionURL}
                    className="hover:bg-transparent dashboard__link !font-[800] !p-0"
                >
                    Replace credit card
                </Link>
                <Link
                    href={mangeSubURLData.getManageSubscriptionURL}
                    className="hover:bg-transparent dashboard__link !font-[800] !p-0 !pt-1 !m-0"
                >
                    View Transactions
                </Link>
            </CardActions>
        </Card>
    );
}
