"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { Asset as AssetInterface } from "@/interfaces";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/joy";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { IoMdDownload } from "react-icons/io";
import OviooDropDownWrapper from "../OviooDropDownWrapper";
import AssetList from "./AssetList";

const DOWNLOAD_ASSET = gql`
    mutation Mutation($alt: String!) {
        downloadAsset(alt: $alt)
    }
`;
const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;
const sortbyOptions = [
    { title: "all", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project" },
];

export default function AssetListsContainer({
    assets,
    sortBy,
    setAssets,
}: {
    assets: AssetInterface[];
    sortBy: string;
    setAssets: Dispatch<SetStateAction<never[]>>;
}) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [downloadAsset] = useMutation(DOWNLOAD_ASSET);
    const [deleteAsset] = useMutation(DELETE_ASSET);

    const downloadUrlsSequentially = (urls: string[]) => {
        if (urls.length === 0) {
            return;
        }

        const url = urls.shift(); // Take the first URL

        const a = document.createElement("a");
        a.style.display = "none";
        url && (a.href = url);
        a.setAttribute("download", "");
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);

            downloadUrlsSequentially(urls);
        }, 1000);
    };

    const handleDownload = async () => {
        setLoading(true);

        let URLs = [];

        try {
            for (const asset of assets) {
                const { data } = await downloadAsset({
                    variables: { alt: asset.alt },
                });

                URLs.push(data.downloadAsset);
            }

            downloadUrlsSequentially(URLs);
        } catch (e: any) {
            toast.error("Something went wrong!");
        }

        setLoading(false);
    };

    const handleDeleteAsset = async ({ id, alt }: AssetInterface) => {
        try {
            await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });

            setAssets((prevState) =>
                prevState.filter((asset: AssetInterface) => asset?.id != id)
            );
            toast.success("Deleted successfully");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };
    return (
        <DashBoardCard
            headerTitle="assets"
            action={
                <Button
                    loading={loading}
                    className="dashboard__link !text-base !bg-transparent shadow-none hover:bg-transparent hover:shadow-none font-semibold pt-3 pr-4"
                    onClick={handleDownload}
                >
                    <IoMdDownload size="24" />
                    Download All Media
                </Button>
            }
        >
            <AssetList
                assets={assets}
                handleDelete={handleDeleteAsset}
                readOnly
            />
        </DashBoardCard>
    );
}
