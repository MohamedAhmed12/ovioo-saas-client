"use client";

import "@/styles/components/home/pyramid-section.scss";
import {
    Box,
    Breadcrumbs,
    Button,
    MobileStepper,
    SvgIcon,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export const PyramidSection = () => {
    const titles = ["Quality", "Speed", "Cost"];
    const steps = [
        {
            label: "Vetted Designers Only",
            description: `Access our global community of top talent.`,
        },
        {
            label: "24 Hour Updates",
            description: "Receive updates every 24 business hours.",
        },
        {
            label: "Save up to $5k per month",
            description: `Save on a full-time designer salary plus the hiring expenses. Just a flat monthly subscription.`,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) =>
            prevActiveStep != maxSteps - 1
                ? prevActiveStep + 1
                : (prevActiveStep = 0)
        );
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) =>
            prevActiveStep != 0 ? prevActiveStep - 1 : (prevActiveStep = 2)
        );
    };
    const handleTitleClick = (index: number) => setActiveStep(index);

    return (
        <div className="pyramid-section__stars-bg flex w-full justify-center">
            <div className="container pyramid-section flex flex-col lg:flex-row mt-10 lg:mt-0 mb-5 px-[5%]">
                <div className="text-3xl basis-2/3 mb-14 lg:mb-0">
                    <Image
                        src="/gif/pyramid.gif"
                        alt="pyramid"
                        width={550}
                        height={0}
                        unoptimized
                    /> 
                </div>
                <div className="text-4xl basis-1/3 font-bold mt-14">
                    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                        <Breadcrumbs aria-label="breadcrumb" className="mb-12">
                            {titles.map((title, index) => (
                                <Typography
                                    variant="body1"
                                    key={title}
                                    className={`text-2xl
                                        ${
                                            activeStep == index
                                                ? "selected text-secondary underline underline-offset-[20px]"
                                                : ""
                                        }`}
                                    onClick={() => handleTitleClick(index)}
                                >
                                    {title}
                                </Typography>
                            ))}
                        </Breadcrumbs>
                        <Box className="mb-4 text-secondary">
                            <Typography variant="h5">
                                {steps[activeStep].label}
                            </Typography>
                        </Box>
                        <Box className="description-box">
                            <Typography>
                                {steps[activeStep].description}
                            </Typography>
                        </Box>
                        <MobileStepper
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    variant="outlined"
                                    aria-label="EastIcon"
                                >
                                    <FaArrowRightLong size="1rem" />
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    variant="outlined"
                                    aria-label="WestIcon"
                                >
                                    <FaArrowLeftLong size="1rem" />
                                </Button>
                            }
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};
