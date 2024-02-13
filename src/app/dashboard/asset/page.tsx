"use client";

import AssetListsContainer from "@/components/Dashboard/Asset/AssetListsContainer";
import "@/styles/app/dashboard/asset.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const LIST_ASSETS = gql`
    query Query($id: String) {
        listAssets(id: $id) {
            id
            src
            alt
            type
            project {
                id
                title
            }
        }
    }
`;

export default function Asset() {
    const [assets, setAssets] = useState([]);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_ASSETS, { fetchPolicy: "no-cache" });

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data.listAssets && assets.length == 0) {
            setAssets(data.listAssets);
        }
    }, [graphQLloading, data, assets.length]);

    return (
        !graphQLloading &&
        !error &&
        data.listAssets && (
            <div className="asset-container flex justify-start flex-wrap">
                <AssetListsContainer
                    sortBy="all"
                    assets={assets}
                    setAssets={setAssets}
                />
            </div>
        )
    );
}
