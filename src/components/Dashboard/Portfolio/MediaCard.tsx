"use client";

import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/cards/media-card.scss";
import { isVideo as isVideoHelper } from "@/utils/helpers";
import { Backdrop } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Image from "next/image";
import { useState } from "react";

export default function PortfolioMediaCard({
    asset,
}: {
    asset: AssetInterface;
}) {
    const isVideo = isVideoHelper(asset);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <ButtonBase
                className="assets__media-card !w-full h-[100px] lg:w-[200px] !text-gray-300 font-bold"
                focusRipple
                onClick={handleToggle}
            >
                <Image
                    className="img w-full h-full"
                    src={`${asset.src}?fit=crop&auto=format`}
                    alt={asset.alt}
                    loading="lazy"
                    width={660}
                    height={550}
                />
            </ButtonBase>
            <Backdrop
                open={open}
                onClick={handleToggle}
                className="overflow-y-auto z-[99999]"
            >
                {isVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        src={asset.src}
                        className="max-w-[80%]"
                    />
                ) : (
                    <Image
                        src={asset.src}
                        width={660}
                        height={550}
                        alt={asset.alt}
                    />
                )}
            </Backdrop>
        </>
    );
}
