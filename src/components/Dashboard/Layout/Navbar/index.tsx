import { useAppSelector } from "@/hooks/redux";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaImages } from "react-icons/fa6";
import { MdAttachMoney, MdTask } from "react-icons/md";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import NavbarWrapper from "./NavbarWrapper";

const NavbarTabs = [
    {
        title: "Tasks",
        url: "/dashboard/task",
        icon: <MdTask size="25" />,
    },
];
const UserNavbarTabs = [
    {
        title: "My assets",
        url: "/dashboard/asset",

        icon: <FaImages size="25" />,
    },
    {
        title: "Credit",
        url: "/dashboard/payment",
        icon: <MdAttachMoney size="25" />,
    },
];

export default function Navbar() {
    const isUser = useAppSelector((state) => state.userReducer.isUser);
    const navbarLinks: () => {
        title: string;
        url: string;
        icon: JSX.Element;
    }[] = () => {
        if (!isUser) {
            return NavbarTabs;
        }
        return [...NavbarTabs, ...UserNavbarTabs];
    };

    const renderContent = (
        <SimpleBar className="h-full bg-inherit dark:text-white ">
            <Box className="flex max-h-[100px] px-5 py-6">
                <Link href="/">
                    <Image
                        src="/svg/logo.svg"
                        className="hamburger-icon slef-center"
                        width="199"
                        height="52"
                        alt="logo"
                        style={{
                            height: 52,
                            width: 199,
                        }}
                    />
                </Link>
            </Box>
            <Box>
                <List disablePadding className=" dark:text-white">
                    {navbarLinks().map(({ title, url, icon }) => (
                        <Link href={url} key={title}>
                            <ListItemButton
                                disableGutters
                                className="navItem text-inherit"
                            >
                                <ListItemIcon>{icon && icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={title}
                                />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
        </SimpleBar>
    );

    return <NavbarWrapper content={renderContent} />;
}
