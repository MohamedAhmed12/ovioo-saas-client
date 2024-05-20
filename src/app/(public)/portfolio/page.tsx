"use client";

import PortfolioMediaCard from "@/components/Dashboard/Portfolio/MediaCard";
import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/app/unauth/portfolio.scss";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";

const steps = [
    {
        title: "All",
        images: [
            {
                src: "https://picsum.photos/id/135/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/12/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/67/1000/1000",
                alt: "Camera",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/96/1000/1000",
                alt: "Coffee",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/33/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/22/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
        ],
    },
    {
        title: "UI / UX",
        images: [
            {
                src: "https://picsum.photos/id/736/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/67/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/34/1000/1000",
                alt: "Camera",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/432/1000/1000",
                alt: "Coffee",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/123/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/53/1000/1000",
                alt: "Honey",
                author: "@arwinneil",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/34/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/158/1000/1000",
                alt: "Burger",
                type:'png'
            },
        ],
    },
    {
        title: "Logo & Brand identity",
        images: [
            {
                src: "https://picsum.photos/id/135/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/12/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/67/1000/1000",
                alt: "Camera",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/96/1000/1000",
                alt: "Coffee",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/76/1000/1000",
                alt: "Honey",
                author: "@arwinneil",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/66/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/33/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/22/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
        ],
    },
    {
        title: "Graphic",
        images: [
            {
                src: "https://picsum.photos/id/20/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/43/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/1000/347/1000",
                alt: "Camera",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/444/1000/1000",
                alt: "Coffee",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/547/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/22/1000/1000",
                alt: "Honey",
                author: "@arwinneil",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/78/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/83/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/95/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/123/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
        ],
    },
    {
        title: "Animation",
        images: [
            {
                src: "https://picsum.photos/id/10/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/11/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/30/1000/1000",
                alt: "Camera",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/50/1000/1000",
                alt: "Coffee",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/46/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/43/1000/1000",
                alt: "Honey",
                author: "@arwinneil",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/3/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/39/1000/1000",
                alt: "Burger",
                type:'png'
            },
            {
                src: "https://picsum.photos/id/185/1000/1000",
                alt: "Breakfast",
                type:'png'
            },
        ],
    },
];

export default function Portfolio() {
    return (
        <>
            <div className="portfolio container flex flex-col pr-5 pl-5 mt-20 mb-40">
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
                                className="w-full px-5 "
                                variant="quilted"
                                cols={3}
                            >
                                {images.map((asset: AssetInterface, index) => (
                                    <ImageListItem key={index + "img"}>
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
