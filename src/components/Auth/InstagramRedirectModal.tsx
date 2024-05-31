import { Button } from "@mui/joy";
import { Backdrop } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const InstagramRedirectModal = ({
    setShouldRedirect,
}: {
    setShouldRedirect: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <Backdrop
            open={true}
            onClick={() => setShouldRedirect(false)}
            className="flex-col bg-black/90 z-[999] text-center font-normal px-5"
        >
            <p className="text-lg my-8 text-white">
                Google doesn't allow signing in from within Instagram. To sign
                in with Google, please open the page in external browser
            </p>
            <Button
                variant="solid"
                type="submit"
                className="auth-btn min-w-[75px]"
            >
                <a href={location.href} target="_blank" download>
                    Open in browser
                </a>
            </Button>
        </Backdrop>
    );
};

export default InstagramRedirectModal;
