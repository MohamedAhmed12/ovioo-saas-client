import { Route as RouteInterface } from "@/interfaces";
import { Avatar, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MouseEvent, useState } from "react";

export default function UserIcon({ settings }: { settings: RouteInterface[] }) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleToggleUserMenu = (event: MouseEvent<HTMLElement> | null) => {
        setAnchorElUser(event ? event.currentTarget : null);
    };

    return (
        <div>
            <IconButton
                onClick={handleToggleUserMenu}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ p: 0 }}
            >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
                id="menu-appbar"
                sx={{ mt: "47px", zIndex: 9999 }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleToggleUserMenu(null)}
            >
                {settings.map((setting) => (
                    <MenuItem
                        key={setting.title}
                        onClick={() => handleToggleUserMenu(null)}
                    >
                        {setting.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
