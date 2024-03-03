"use client";

import DashboardHeader from "@/components/Dashboard/Layout/Header/index";
import { AllowedRoutes } from "@/constants/AllowedRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RoleEnum, UserInterface } from "@/interfaces";
import { ModeEnum } from "@/interfaces/store/main";
import { setUser } from "@/store/features/user";
import "@/styles/app/dashboard/layout.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
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
            }
        }
    }
`;

export default function DashboardContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const session = useSession();
    const currentUser = session?.data?.user as UserInterface;
    const mode = useAppSelector((state) => state.mainReducer.mode);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isRedirecting, setIsRedirecting] = useState(true);
    const [navbarIsHidden, setNavbarIsHidden] = useState(false);

    const [toggleUserStatus] = useMutation(TOGGLE_USER_STATUS);
    const {
        loading: graphQLloading,
        data: userData,
        error,
    } = useQuery(FETCH_USER_WITH_PROFILE, { fetchPolicy: "no-cache" });
    if (error) throw new Error(JSON.stringify(error));

    const handleBeforeUnload = () =>
        toggleUserStatus({
            variables: {
                isActive: false,
            },
        });

    useEffect(() => {
        toggleUserStatus({
            variables: {
                isActive: true,
            },
        });
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    useEffect(() => {
        if (!graphQLloading && userData?.me) {
            const isDesigner = [RoleEnum.Designer, RoleEnum.Agency].includes(
                userData.me.role
            );
            dispatch(setUser(userData.me));

            if (isDesigner) setNavbarIsHidden(true);

            if (
                AllowedRoutes[userData.me.role] &&
                !AllowedRoutes[userData.me.role].includes(pathname)
            ) {
                redirect("/unauthorize");
            } else {
                setIsRedirecting(false);
            }
        }
    }, [userData, graphQLloading]);
    useEffect(() => {
        const htmlElement: HTMLElement = document.documentElement;

        if (htmlElement.classList.contains(ModeEnum.Dark))
            htmlElement.classList.remove(ModeEnum.Dark);

        if (htmlElement.classList.contains(ModeEnum.Light))
            htmlElement.classList.remove(ModeEnum.Light);

        htmlElement.classList.add(mode);
        setLoading(false);
    }, [mode]);

    return (
        !loading &&
        currentUser &&
        !isRedirecting && (
            <main
                className={`flex min-h-screen flex-col dashboard-main-layout pt-32 pb-14 pr-8 ${
                    navbarIsHidden ? "pl-8" : "pl-8 md:pl-80"
                }`}
            >
                <DashboardHeader
                    openNav={open}
                    onOpenNav={() => setOpen(true)}
                    navbarIsHidden={navbarIsHidden}
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
