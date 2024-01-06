import "@/styles/components/navbar/navbar-mobile.scss";

import { Route as RouteInterface } from "@/interfaces";
import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import { MouseEvent } from "react";
import HamburgerMenu from "./HamburgerMenu";
import UserIcon from "./UserIcon";

export default function MobileNavBar({
    pages,
    settings,
    scrolling,
    anchorElNav,
    anchorElUser,
    handleToggleNavMenu,
    handleToggleUserMenu,
}: {
    pages: RouteInterface[];
    settings: RouteInterface[];
    scrolling: boolean;
    anchorElUser: HTMLElement | null;
    anchorElNav: boolean;
    handleToggleNavMenu: (vale: boolean) => void;
    handleToggleUserMenu: (event: MouseEvent<HTMLElement> | null) => void;
}) {
    const authUser = false;

    return (
        <>
            <AppBar
                className={`navbar-container-mobile justify-center ${
                    scrolling ? "navbar-blur" : ""
                }`}
                style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "relative",
                }}
            >
                <Toolbar disableGutters className="w-full justify-center h-full">
                    <div
                        className="navbar-mobile w-full h-full justify-between items-center px-[8%] flex"
                        style={{ position: "relative" }}
                    >
                        <Image
                            src="/svg/logo.svg"
                            className="slef-center mobile-logo"
                            width={100}
                            height={100}
                            alt="logo"
                        />
                        {authUser && (
                            <UserIcon
                                settings={settings}
                                anchorElUser={anchorElUser}
                                handleToggleUserMenu={handleToggleUserMenu}
                            />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <HamburgerMenu
                pages={pages}
                anchorElNav={anchorElNav}
                handleToggleNavMenu={handleToggleNavMenu}
            />
        </>
    );
}
