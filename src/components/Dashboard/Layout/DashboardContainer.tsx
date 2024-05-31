"use client";

import DashboardHeader from "@/components/Dashboard/Layout/Header/index";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useSubscriptionRedirect from "@/hooks/useSubscriptionRedirect";
import { ModeEnum } from "@/interfaces/store/main";
import { setUser } from "@/store/features/user";
import "@/styles/app/dashboard/layout.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const TOGGLE_USER_STATUS = gql`
    mutation ToggleUserStatus($isActive: Boolean!) {
        toggleUserStatus(isActive: $isActive)
    }
`;
const FETCH_USER_WITH_PROFILE = gql`
    query {
        me {
            id
            fullname
            email
            company
            phone
            provider
            avatar
            role
            profile {
                id
                push_notification_enabled
                mail_notification_enabled
            }
            teams {
                id
                stripe_client_reference_id
                card_last4
                subscriptions {
                    id
                    plan {
                        title
                    }
                }
            }
        }
    }
`;

export default function DashboardContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const isRedirecting = useSubscriptionRedirect();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.userReducer.user);
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);
    const mode = useAppSelector((state) => state.mainReducer.mode);

    const [open, setOpen] = useState(false);

    const [toggleUserStatus] = useMutation(TOGGLE_USER_STATUS);
    const { loading: graphQLloading, error } = useQuery(
        FETCH_USER_WITH_PROFILE,
        {
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                dispatch(setUser(data.me));
            },
        }
    );

    useEffect(() => {
        toggleUserStatus({ variables: { isActive: true } });

        const handleBeforeUnload = () =>
            toggleUserStatus({ variables: { isActive: false } });
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    useEffect(() => {
        const htmlElement: HTMLElement = document.documentElement;
        htmlElement.classList.remove(ModeEnum.Dark, ModeEnum.Light);
        htmlElement.classList.add(mode);
    }, [mode]);

    if (error) throw new Error(JSON.stringify(error));

    return (
        !graphQLloading &&
        currentUser &&
        !isRedirecting && (
            <main
                className={`flex min-h-screen flex-col dashboard-main-layout pt-32 pb-14 pr-8 ${
                    isDesigner ? "pl-8" : "pl-8 md:pl-80"
                }`}
            >
                <DashboardHeader
                    openNav={open}
                    onOpenNav={() => setOpen(true)}
                    navbarIsHidden={isDesigner}
                />

                {children}

                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            backgroundColor: "#20212c",
                            color: "#fff",
                        },
                    }}
                />
            </main>
        )
    );
}
