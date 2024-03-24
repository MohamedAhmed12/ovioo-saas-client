import "@/styles/components/navbar/navbar-mobile.scss";

import { useAppSelector } from "@/hooks/redux";
import { Route as RouteInterface } from "@/interfaces";
import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import UserIcon from "./UserIcon";

export default function MobileNavBar({
    pages,
    settings,
    scrolling,
}: {
    pages: RouteInterface[];
    settings: RouteInterface[];
    scrolling: boolean;
}) {
    const authUser = useAppSelector((state) => state.userReducer.user);

    return (
        <>
            <AppBar
                className={`navbar-container-mobile flex !flex-row h-full pl-[8%] pr-[calc(8%-1px)] ${
                    scrolling ? "navbar-blur" : ""
                }`}
                style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "relative",
                }}
            >
                <Toolbar disableGutters className="w-full  ">
                    <Link
                        href="/"
                        className="navbar-mobile h-full items-center flex"
                    >
                        <Image
                            src="/svg/logo.svg"
                            className="slef-center mobile-logo"
                            width={100}
                            height={100}
                            alt="logo"
                        />
                        {authUser && <UserIcon settings={settings} />}
                    </Link>
                </Toolbar>
                <HamburgerMenu pages={pages} />
            </AppBar>
        </>
    );
}
