import "@/styles/components/navbar/navbar-mobile.scss";

import { Route as RouteInterface, UserInterface } from "@/interfaces";
import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import AccountPopover from "../Dashboard/Layout/Header/AccountPopover";
import HamburgerMenu from "./HamburgerMenu";

export default function MobileNavBar({
    pages,
    scrolling,
    authUser,
}: {
    pages: RouteInterface[];
    scrolling: boolean;
    authUser: UserInterface;
}) {
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
                    </Link>
                </Toolbar>
                <HamburgerMenu pages={pages} />
                {authUser && <AccountPopover />}
            </AppBar>
        </>
    );
}
