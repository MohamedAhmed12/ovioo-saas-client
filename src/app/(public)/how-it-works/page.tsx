"use client";

import BottomWrapper from "@/components/BottomWrapper";
import HowItWorksStepper from "@/components/HowItWorks/HowItWorksStepper";
import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/app/unauth/how-it-works.scss";
import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

export default function HowItWorks() {
    const faq: FAQInterface[] = [
        {
            question: "Every day business updates - what’s that?",
            answer: "Every business day, your designer will provide you with an update on your task, or switch to a new one when it's completed.",
        },
        {
            question: "How many designs do I get in a month?",
            answer: "This depends on the complexity and number of iterations for each task. Every task is different, but we guarantee you will receive daily design updates.",
        },
    ];

    const itemData = [
        {
            img: "/images/smile.jpg",
            alt: "Breakfast",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            alt: "Burger",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            alt: "Camera",
            rows: 2,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            alt: "Coffee",
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            alt: "Breakfast",
            rows: 2,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            alt: "Honey",
            author: "@arwinneil",
            rows: 1,
            cols: 2,
        },
        {
            img: "/images/smile.jpg",
            alt: "Breakfast",
            rows: 1,
            cols: 1,
        },
        {
            img: "/images/smile.jpg",
            alt: "Burger",
            rows: 1,
            cols: 1,
        },
    ];

    return (
        <div className="how-it-works">
            <div className="intro flex flex-col items-center pr-[10px] pl-[10px] relative">
                <div className="container title uppercase text-center">
                    <Typography variant="h2" className="font-bold">
                        get daily, <span className="text-gradient">high-end design</span>
                        <br />
                        done with ovioo
                    </Typography>
                </div>

                <HowItWorksStepper />
            </div>
            <div className="container w-full p-5 flex justify-center">
                <iframe
                    width="1200"
                    height="480"
                    src="https://www.youtube.com/embed/AhU7pnjAXg0?si=RpdLEZhUZGpX8ql_"
                    title="Positive Vibes Music 🌻 Top 100 Chill Out Songs Playlist | Romantic English Songs With Lyrics"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="hidden what-you-get text-[40px] font-medium text-center mt-36 mb-20 px-5 flex flex-col items-center">
                <h3 className="mb-10 lg:mb-20 text-3xl lg:text-[2.8rem]">What You Get With Ovioo</h3>
                <ImageList
                    className="w-full"
                    sx={{ gridAutoColumns: 1 }}
                    variant="quilted"
                    cols={4}
                >
                    {itemData.map(
                        (
                            {
                                img,
                                alt,
                                cols = 1,
                                rows = 1,
                            }: { img: string; alt: string; cols?: number; rows?: number },
                            index
                        ) => (
                            <ImageListItem key={index} cols={cols} rows={rows}>
                                <Image
                                    src={`${img}?w=${121 * cols}&h=${
                                        121 * rows
                                    }&fit=crop&auto=format`}
                                    alt={alt}
                                    loading="lazy"
                                    className="img"
                                    width={100}
                                    height={100}
                                />
                            </ImageListItem>
                        )
                    )}
                </ImageList>
            </div>
            <BottomWrapper faq={faq} />
        </div>
    );
}
