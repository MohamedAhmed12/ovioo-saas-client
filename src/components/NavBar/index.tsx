"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Route as RouteInterface } from "@/interfaces";
import { setUser } from "@/store/features/user";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import MobileNavBar from "./MobileNavBar";

const pages: RouteInterface[] = [
    { url: "/portfolio", title: "Our Work" },
    { url: "/pricing", title: "Plans" },
    { url: "/how-it-works", title: "How it Works" },
    { url: "/about", title: "About Us" },
    { url: "/auth/login", title: "Log In" },
];

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

function NavBar() {
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.userReducer.user);

    const [scrolling, setScrolling] = useState<boolean>(false);

    useQuery(FETCH_USER_WITH_PROFILE, {
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
            dispatch(setUser(data.me));
        },
    });

    useEffect(() => {
        const handleScroling = () => {
            window.scrollY > 0 ? setScrolling(true) : setScrolling(false);
        };

        window.addEventListener("scroll", handleScroling);
        return () => {
            window.removeEventListener("scroll", handleScroling);
        };
    }, []);

    return (
        <>
            <Desktop pages={pages} scrolling={scrolling} authUser={authUser} />
            <MobileNavBar
                pages={pages}
                scrolling={scrolling}
                authUser={authUser}
            />
        </>
    );
}

export default NavBar;
