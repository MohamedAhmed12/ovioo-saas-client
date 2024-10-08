"use client";

import "@/styles/app/unauth/demo.scss";
import Image from "next/image";
import Script from "next/script";
import Loading from "../../loading";

export default function Demo() {
    return (
        <div className="demo min-h-screen w-full">
            <div className={`w-full flex items-center flex-col mt-28 mb-28`}>
                <h3 className="title text-[1.6rem] leading-relaxed lg:text-5xl lg:!leading-[3.6rem] max-w-5xl font-medium capitalize text-center">
                    book your demo with one
                    <br /> of our team{" "}
                    <span className="text-gradient">heroes</span>
                </h3>

                <div className="flex flex-row justify-center lg:justify-between w-full">
                    <div
                        id="calendly-container"
                        className="calendly-inline-widget px-5 lg:px-12 lg:basis-1/2"
                        data-url="https://calendly.com/info-ywk0/30min?hide_gdpr_banner=1"
                    >
                        <div className="absolute z-[0]">
                            <Loading bgTransparent />
                        </div>
                    </div>
                    <div className="basis-1/2 hidden lg:flex">
                        <Image
                            src="/svg/planet.svg"
                            alt="login"
                            width={200}
                            height={200}
                            className="w-full h-auto"
                        />
                    </div>

                    <Script
                        type="text/javascript"
                        src="/js/calendly-inline-widget.js"
                        async
                    ></Script>
                </div>
            </div>
        </div>
    );
}
