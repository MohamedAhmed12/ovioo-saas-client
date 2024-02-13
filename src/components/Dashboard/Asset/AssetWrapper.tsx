import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { isImage, isVideo } from "@/utils/helpers";
import { gql, useMutation } from "@apollo/client";
import Card from "@mui/joy/Card";
import { CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdMore } from "react-icons/io";
import LinkAssetCard from "./Cards/DefaultCard";
import MediaCard from "./Cards/MediaCard";

const DOWNLOAD_ASSET = gql`
    mutation Mutation($alt: String!) {
        downloadAsset(alt: $alt)
    }
`;

export default function AssetWrapper({
    asset,
    handleDelete,
}: {
    asset: AssetInterface;
    handleDelete: (asset: AssetInterface) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [downloadAsset] = useMutation(DOWNLOAD_ASSET);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const getAssetToRender = (asset: AssetInterface) => {
        if (isImage(asset) || isVideo(asset)) {
            return <MediaCard asset={asset} />;
        }

        return <LinkAssetCard asset={asset} />;
    };
    const handleDownload = async (alt: string) => {
        try {
            const { data } = await downloadAsset({
                variables: { alt },
            });

            const a = document.createElement("a");
            a.href = data.downloadAsset;
            a.download = alt;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e: any) {
            toast.error("Something went wrong!");
        }

        setAnchorEl(null);
    };

    return (
        <Card component="li" className="!bg-gray-200">
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleOpenMenu}>
                        <IoMdMore className="font-bold" />
                    </IconButton>
                }
                className="absolute z-[100] !p-3 right-[1px] top-[1px] !bg-transparent"
            />

            {getAssetToRender(asset)}

            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleDownload(asset.alt)}>
                    download
                </MenuItem>
                <MenuItem onClick={() => handleDelete(asset)}>delete</MenuItem>
            </Menu>
        </Card>
    );
}
