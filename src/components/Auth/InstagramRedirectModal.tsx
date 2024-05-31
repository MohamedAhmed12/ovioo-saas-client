import { isInstagramBrowser } from "@/utils/helpers";
import { Backdrop } from "@mui/material";
import { useEffect, useState } from "react";

const InstagramRedirectModal = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isInstagramBrowser()) {
            setShouldRedirect(true);
        }
    }, []);

    const handleToggle = () => {
        setOpen((prevState) => !prevState);
    };
    const handleOpenInBrowser = () => {
        const currentUrl = window.location.href;
        window.location.href = `intent:${currentUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
    };

    if (!shouldRedirect) return null;

    return (
        <Backdrop open={open} onClick={handleToggle} className="z-[999]">
            <p>
                You are using the Instagram in-app browser. For a better
                experience, please open this link in your external browser.
            </p>
            <button onClick={handleOpenInBrowser}>Open in Browser</button>
        </Backdrop>
    );
};

export default InstagramRedirectModal;
