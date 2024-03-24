"use client";

import "@/styles/components/home/intro-container.scss";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import GetStartedBtns from "../GetStartedBtns";

export const IntroContainer = () => (
    <div className="public-container w-full intro-container flex flex-col items-center mt-[105px] leading-normal lg:leading-relaxed">
        <h1 className="title font-bold uppercase text-center text-[25px] sm:text-[30px] lg:text-[52px] tracking-normal lg:tracking-wide max-w-[925px]">
            all of your
            <span className="gradient-h1"> design tasks </span>
            <strong>for one fixed monthly fee</strong>
        </h1>
        <p className="subtitle mt-5 text-sm lg:text-xl text-center lg:text-start text-center">
            We match your business with a pro designer. You get design tasks
            done every business day. <FcLike className="inline-block" />
        </p>
        <div className="btns-wrapper mt-3 w-full">
            <GetStartedBtns />
        </div>
        <Image
            src="/svg/astronauts.svg"
            alt="astronauts"
            className="mt-20 w-full px-[9%]"
            width={800}
            height={800}
        />
    </div>
);
