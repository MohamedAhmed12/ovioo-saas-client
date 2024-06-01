import "@/styles/components/navbar/navbar-desktop.scss";

import { Route as RouteInterface, UserInterface } from "@/interfaces";
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import AccountPopover from "../Dashboard/Layout/Header/AccountPopover";
import HideOnScroll from "../HideOnScroll";
import BookDemoBtn from "./BookDemoBtn";

export default function Desktop({
    pages,
    scrolling,
    authUser,
}: {
    pages: RouteInterface[];
    scrolling: boolean;
    authUser: UserInterface;
}) {
    return (
        <HideOnScroll>
            <AppBar
                className={`navbar-container justify-center px-10 ${
                    scrolling ? "navbar-blur" : ""
                }`}
                style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "sticky",
                }}
            >
                <Toolbar
                    disableGutters
                    className="w-full justify-center h-full"
                >
                    <div className="navbar-desktop-bg w-full h-full justify-center items-center flex">
                        <div className="navbar-desktop hidden lg:flex">
                            <Link
                                href="/"
                                className="main-logo h-full max-w-full pt-[5px]"
                            >
                                <Image
                                    src="/svg/logo.svg"
                                    className="slef-center"
                                    width={800}
                                    height={800}
                                    alt="logo"
                                />
                            </Link>
                            <Box
                                sx={{ display: { xs: "none", md: "flex" } }}
                                className={`self-center ${
                                    authUser ? "px-3" : ""
                                }`}
                            >
                                <div className="menu">
                                    {pages.map(({ url, title }) => (
                                        <Link
                                            key={title}
                                            href={url}
                                            className="navlink-2 bottom-gradient inline-block"
                                        >
                                            {title}
                                        </Link>
                                    ))}
                                </div>
                                <BookDemoBtn />
                            </Box>
                        </div>
                        {authUser && <AccountPopover />}
                    </div>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
