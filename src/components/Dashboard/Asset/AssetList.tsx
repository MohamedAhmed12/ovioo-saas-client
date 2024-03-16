"use client";

import {
    Asset as AssetInterface,
    TaskInterface,
    s3PathInterface,
} from "@/interfaces";
import { setTaskAssets } from "@/store/features/task";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { uploadFiles } from "@/utils/helpers";
import { gql, useMutation } from "@apollo/client";
import Box from "@mui/joy/Box";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AddAssetCard from "./AddAssetCard";
import AssetWrapper from "./AssetWrapper";

const CREATE_ASSET = gql`
    mutation Mutation($data: CreateAssetDto!) {
        createAssets(data: $data) {
            id
            src
            alt
            type
            project {
                id
            }
            task {
                id
            }
        }
    }
`;
const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;

export default function AssetList({
    task,
    assets,
    readOnly,
    handleDelete,
}: {
    task?: TaskInterface;
    assets: AssetInterface[];
    readOnly?: boolean;
    handleDelete: (asset: AssetInterface) => void;
}) {
    const { data: session, status } = useSession({
        required: true,
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const [createAssets] = useMutation(CREATE_ASSET);
    const [deleteAsset] = useMutation(DELETE_ASSET);

    const handleAssetsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!task) return;

        setLoading(true);

        let assets = await uploadFiles(
            e,
            session,
            `tasks/${task.id}/assets`,
            true
        );

        if (!assets) {
            return setLoading(false);
        }

        assets = assets.map(
            ({ type, s3Path }: { type: string; s3Path: s3PathInterface }) => ({
                alt: s3Path.Key,
                src: s3Path.Location,
                type,
            })
        );

        try {
            const { data } = await createAssets({
                variables: {
                    data: {
                        task_id: task.id,
                        assets,
                    },
                },
            });

            if (data?.createAssets) {
                dispatch(
                    setTaskAssets([
                        ...(task?.assets || []),
                        ...data?.createAssets,
                    ])
                );
                toast.success("Uploaded successfully");
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
            AssetUploadCleanup(assets);
        } finally {
            setLoading(false);
        }
    };

    const AssetUploadCleanup = (assets: AssetInterface[]) => {
        /* Delete assets from S3 if creation of assets record
         * on our serverfailed
         * If "id" provided then it will delete both in DB & S3
         */
        assets.map(async ({ id, alt }: { id?: string; alt: string }) => {
            if (!id) return;
            const { data } = await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });
        });
    };

    return (
        <Box
            flexDirection="column"
            className="asset-list flex p-0 cursor-pointer"
        >
            <Box
                component="ul"
                flexDirection="row"
                className="flex gap-6 flex-wrap"
            >
                {assets.length > 0 ? (
                    assets.map((asset) => (
                        <AssetWrapper
                            key={asset.id}
                            handleDelete={handleDelete}
                            asset={asset}
                        />
                    ))
                ) : (
                    <h3 className="text-xl">No assets uploaded yet.</h3>
                )}
            </Box>
            <Box
                component="ul"
                flexDirection="row"
                className="flex gap-6 flex-wrap mt-8"
            >
                {!readOnly && (
                    <AddAssetCard
                        handleAssetsUpload={handleAssetsUpload}
                        loading={loading}
                    />
                )}
            </Box>
        </Box>
    );
}
