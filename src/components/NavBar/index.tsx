"use client";

import { Route as RouteInterface } from "@/interfaces";
import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import MobileNavBar from "./MobileNavBar";

function NavBar() {
    const pages: RouteInterface[] = [
        // { url: "/portfolio", title: "Our Work" },
        { url: "/pricing", title: "Plans" },
        { url: "/how-it-works", title: "How it Works" },
        { url: "/about", title: "About Us" },
        { url: "/auth/login", title: "Log In" },
    ];
    const settings: RouteInterface[] = [
        { url: "/profile", title: "Profile" },
        { url: "/account", title: "Account" },
        { url: "/dashboard", title: "Dashboard" },
        { url: "/logout", title: "Logout" },
    ];

    const [scrolling, setScrolling] = useState<boolean>(false);

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
            <Desktop pages={pages} scrolling={scrolling} />
            <MobileNavBar pages={pages} settings={settings} scrolling={scrolling} />
        </>
    );
}

export default NavBar;
