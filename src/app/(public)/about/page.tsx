"use client";

import AboutStepper from "@/components/About/AboutStepper";
import BottomWrapper from "@/components/BottomWrapper";
import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/app/unauth/about-us.scss";
import Image from "next/image";

export default function Home() {
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

    const statistics: string[] = ["Innovation", "Passion", "Punctuality"];

    return (
        <div className="about">
            <div className="intro flex flex-col">
                <div className="container title uppercase text-center">
                    <h2 className="text-3xl leading-[40px] md:text-[40px] md:leading-[60px] lg:text-5xl lg:leading-[80px]">
                        <span className="text-gradient font-bold">ovioo</span>
                        <span className="title-span ml-4 mr-4 block sm:inline">=</span>
                        <span>
                            <span className="font-bold"> Exceptional</span> clients
                        </span>
                        <br />
                        <span className="title-span inline-block w-full sm:w-auto">+</span>
                        <span>
                            <span className="font-bold"> Cosmic</span> designers
                        </span>
                    </h2>
                </div>

                <AboutStepper />
            </div>
            <div className="info px-[5%] lg:px-[9%] w-full flex-col lg:flex-row flex items-center justify-between mb-10 max-w-[1300px]">
                <h2 className="text-4xl md:text-[40px] lg:text-4xl font-medium md:!leading-snug basis-2/3 text-center lg:text-left p-0 lg:pr-10 mb-3">
                    <span className="text-secondary">Ovioo </span>
                    is the perfect fusion of innovation and imagination.
                    <br />
                    We firmly stand behind the notion that every client has a
                    distinct
                    <span className="text-secondary"> story </span>
                    to share, and it is our goal to empower them to do so
                    through the power of visual expression.
                    <br />
                    <br />
                    We've developed an
                    <span className="text-secondary"> AI </span> algorithm to
                    match businesses with the best-fit designers.
                </h2>
                <div className="flex basis-1/3 mt-8 lg:mt-0 justify-end">
                    <Image
                        src="/images/smile.png"
                        alt="smile"
                        width={610}
                        height={500}
                        unoptimized
                        className="max-w-[290px] max-h-[356px]"
                    />
                </div>
            </div>
            <div className="public-container values section mt-25 mb-20">
                <div className="title-wrapper">
                    <h3 className="text-[30px] font-medium text-center mt-20">
                        Our Values
                    </h3>
                </div>
                <div className="container w-full flex-col  flex items-center justify-between">
                    <div className="basis-1/2 mt-8">
                        <Image
                            src="/gif/values-pyramid.gif"
                            alt="quality pyramid"
                            width={550}
                            height={0}
                        />
                    </div>
                    <div className="statistics-container flex flex-col lg:flex-row mt-10 justify-center">
                        {statistics.map((stat, index) => (
                            <div
                                className="statistics-figures flex mt-8 lg:mt0"
                                key={index}
                            >
                                <div className="statistics-number mr-7 lg:mr-4">
                                    <div className="about-figure">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="flex text-statistic items-center">
                                    <div className="down-text text-xl">
                                        {stat}
                                    </div>
                                </div>
                                {statistics.length !== index + 1 && (
                                    <div className="about-statistics-divider hidden lg:block mr-12 ml-12"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BottomWrapper faq={faq} />
        </div>
    );
}
