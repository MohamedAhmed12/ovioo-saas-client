import "@/styles/components/dashboard/layout/navbar.scss";
import { Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import { ReactNode, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "simplebar-react/dist/simplebar.min.css";

export default function NavbarWrapper({ content }: { content: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="navbar lg:w-[240px] bg-transparent">
            {!open && (
                <IconButton
                    onClick={() => setOpen(true)}
                    className="dashboard__hamburger-btn toolbar-icon"
                >
                    <AiOutlineMenu />
                </IconButton>
            )}

            <Drawer
                open
                variant="permanent"
                anchor="left"
                className="hidden md:flex"
            >
                {content}
            </Drawer>

            {open && (
                <SwipeableDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(false)}
                    className="flex lg:hidden swipeable-drawer"
                >
                    {content}
                </SwipeableDrawer>
            )}
        </div>
    );
}
