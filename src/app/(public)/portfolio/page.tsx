"use client";

import PortfolioMediaCard from "@/components/Dashboard/Portfolio/MediaCard";
import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/app/unauth/portfolio.scss";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";

const steps = [
    {
        title: "All",
        images: [
            {
                src: "https://picsum.photos/id/135/1000/1000",
                alt: "Breakfast",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/12/1000/1000",
                alt: "Burger",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/67/1000/1000",
                alt: "Camera",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/96/1000/1000",
                alt: "Coffee",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/33/1000/1000",
                alt: "Burger",
                type: "png",
            },
            {
                src: "https://picsum.photos/id/22/1000/1000",
                alt: "Breakfast",
                type: "png",
            },
        ],
    }
];

export default function Portfolio() {
    const isXs = useMediaQuery("(max-width:767px)");
    const isSm = useMediaQuery("(min-width:767px) and (max-width:991px)");
    const isMd = useMediaQuery("(min-width:991px)");

    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        return 1;
    };

    return (
        <>
            <div className="portfolio container flex flex-col mt-20 mb-40">
                <h2 className="mb-10 text-[2.5rem] text-center">
                    Ovioo <strong>projects</strong>
                </h2>
                <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList className="w-full justify-center flex !flex-col lg:!flex-row">
                        {steps.map(({ title }, i) => (
                            <Tab key={i + "-tab"}>{title}</Tab>
                        ))}
                    </TabList>

                    {steps.map(({ images }, i) => (
                        <TabPanel key={i + "-tab-panel"} value={i}>
                            <ImageList
                                className="w-full overflow-visible"
                                variant="quilted"
                                cols={getCols()}
                                rowHeight="auto"
                                gap={!isXs ? 30 : 25}
                            >
                                {images.map((asset: AssetInterface, index) => (
                                    <ImageListItem key={index + "img"} className="flex aspect-[5/4]">
                                        <PortfolioMediaCard asset={asset} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </>
    );
}
