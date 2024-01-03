"use client";

import "@/styles/components/home/intro-container.scss";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import GetStartedBtns from "../GetStartedBtns";

export const IntroContainer = () => (
    <div className="xl:container intro-container flex flex-col items-center">
        <h1 className="title font-bold uppercase">
            all of your
            <span className="gradient-h1"> design tasks</span> <br />
            <strong>for one fixed monthly fee</strong>
        </h1>
        <p className="subtitle mt-5">
            We match your business with a pro designer. You get design tasks
            done every business day. <FcLike className="inline-block" />
        </p>
        <div className="btns-wrapper mt-3 w-full">
            <GetStartedBtns />
        </div>
        <Image
            src="/svg/astronauts.svg"
            alt="astronauts"
            className="mt-20 w-full px-28"
            width={800}
            height={800}
        />
    </div>
);
