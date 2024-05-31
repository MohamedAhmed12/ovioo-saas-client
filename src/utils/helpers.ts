import { Asset } from "@/interfaces";
import { Session } from "next-auth";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export const isVideo = (asset: Asset): boolean =>
    asset ? asset.type.startsWith("video/") : false;
export const isImage = (asset: Asset): boolean =>
    asset ? asset.type.startsWith("image/") : false;

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const ObjectHasVal = (object: Object, val: any) =>
    Object.values(object).includes(val);

export const isInstagramBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase() || window?.opera;
    return userAgent.includes("instagram");
};

function cleanDirectory(path: string, session: Session | null) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/directory/clean`, {
        method: "POST",
        body: JSON.stringify({ path }),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.access_token}`,
        },
    });
}

export const uploadFiles = async (
    e: ChangeEvent<HTMLInputElement>,
    session: Session | null,
    path: string,
    inDirectory: boolean = false,
    directoryReset: boolean = false
): Promise<any> => {
    try {
        const files = e?.target?.files;

        if (!files || files?.length === 0) return;

        const form = new FormData();
        form.append("path", path);
        form.append("inDirectory", inDirectory.toString());

        for (let i = 0; i < files.length; i++) {
            form.append("files[]", files[i]);
        }

        if (directoryReset) cleanDirectory(path, session);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/upload`,
            {
                method: "POST",
                body: form,
                headers: {
                    authorization: `Bearer ${session?.access_token}`,
                },
            }
        );

        if (response.ok) {
            return await response.json();
        } else {
            toast.error("Something went wrong!");
        }
    } catch (e: any) {
        toast.error("Something went wrong!");
    }
};
