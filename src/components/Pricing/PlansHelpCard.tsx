"use client";

import AnimatedBtn from "@/components/AnimatedBtn";
import "@/styles/components/pricing/plans-help-card.scss";
import { Chip, List } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function PlansHelpCard() {
    return (
        <div className="w-full px-[9%]">
            <Card
                variant="solid"
                invertedColors
                className="flex flex-row plans__help-card mt-20 !px-12 !py-10 rounded-lg shadow-xl"
            >
                <CardContent
                    orientation="horizontal"
                    className="flex flex-wrap max-w-full"
                >
                    <div className="flex-1 pricing__add-ons">
                        <Chip
                            size="md"
                            variant="solid"
                            color="neutral"
                            className="mr-3"
                        >
                            Add-on
                        </Chip>
                        <List aria-labelledby="decorated-list-demo">
                            <ListItem className="flex flex-row md:!text-2xl !p-0 !pt-4">
                                <span className="basis-4/5">
                                    <ListItemDecorator>
                                        <Image
                                            src="/icons/web-flow.png"
                                            alt="webflow icon"
                                            width={25}
                                            height={25}
                                        />
                                    </ListItemDecorator>
                                    Full web design using Webflow
                                </span>
                                <span className="basis-1/5 font-semibold text-secondary">
                                    $500
                                </span>
                            </ListItem>
                            <ListItem className="flex flex-row  md:!text-2xl !p-0 !pt-4">
                                <span className="basis-4/5">
                                    <ListItemDecorator>📹</ListItemDecorator>{" "}
                                    Video editing
                                </span>
                                <span className="basis-1/5 font-semibold text-secondary">
                                    $1000
                                </span>
                            </ListItem>
                        </List>
                    </div>
                    <div className="pricing__not-sure flex-1 flex-col pt-10 lg:pt-0 px-3 max-w-full">
                        <Typography
                            variant="h2"
                            className="font-bold text-2xl lg:text-4xl"
                        >
                            Not sure what to choose?
                        </Typography>
                        <p className="text-base lg:text-lg">
                            We will help you build a plan acording to you needs
                        </p>
                        <div className="mt-12 flex justify-end">
                            <AnimatedBtn title="Book a Demo" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
