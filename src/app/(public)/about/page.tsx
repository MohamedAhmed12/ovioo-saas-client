"use client";

import AboutStepper from "@/components/About/AboutStepper";
import BottomWrapper from "@/components/BottomWrapper";
import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/app/unauth/about-us.scss";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

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

    const statistics: string[] = [
        "<p>Enthusiastic<br />and <strong>devoted</strong></p>",
        "<p><strong>Brave</strong>to express<br />ourselves</p>",
        "<p><strong>Sincere</strong>&amp;<br />straightforward</p>",
    ];

    return (
        <div className="about">
            <div className="intro flex flex-col">
                <div className="container title uppercase text-center">
                    <h2>
                        <span className="text-gradient font-bold">ovioo</span>
                        <span className="title-span ml-4 mr-4">=</span>
                        <span className="font-bold">amazing</span> companies
                        <br />+ <span className="font-bold">cosmic</span> designers
                    </h2>
                </div>

                <AboutStepper />
            </div>
            <div className="info px-[5%] lg:px-[9%] w-full flex-col lg:flex-row flex items-center justify-between mb-10">
                <h2 className="text-4xl md:text-[40px] lg:text-5xl font-medium md:!leading-snug basis-1/2 text-center lg:text-left p-0 lg:pr-20 mb-3">
                    We’ve created an algorithm to help others, matching businesses with the best-fit
                    designers.
                </h2>
                <div className="basis-1/2 mt-8 lg:mt-0">
                    <Image src="/images/smile.jpg" alt="smile" width={610} height={500} />
                </div>
            </div>
            <div className="public-container values section mt-25 mb-20">
                <div className="title-wrapper">
                    <h3 className="text-[30px] font-medium text-center mt-20">Our Values</h3>
                </div>
                <div className="container w-full flex-col  flex items-center justify-between">
                    <div className="basis-1/2 mt-8">
                        <Image src="/images/smile.jpg" alt="smile" width={800} height={720} />
                    </div>
                    <div className="statistics-container flex flex-col lg:flex-row mt-10">
                        {statistics.map((stat, index) => (
                            <div className="statistics-figures flex mt-8 lg:mt0" key={index}>
                                <div className="statistics-number mr-7 lg:mr-4">
                                    <div className="about-figure">{index + 1}</div>
                                </div>
                                <div className="text-statistic">
                                    <div className="down-text text-xl">{ReactHtmlParser(stat)}</div>
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
