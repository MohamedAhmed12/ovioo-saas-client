"use client";

import "@/styles/components/home/intro-container.scss";

export const StatsSection = ({ title }: { title?: string }) => (
    <div className="w-full px-[5%] mt-40 max-w-[1200px]">
        <div className="text-center max-w-[850px] m-auto">
            <h2 className="text-2xl lg:text-[38px] leading-relaxed font-normal">
                {title}
            </h2>
        </div>
        <div
            className={`stats-container flex flex-col lg:flex-row ${
                title ? "mt-10" : ""
            }`}
            style={{ color: "#fee4a5" }}
        >
            <div className="flex flex-col basis-1/2">
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl min-w-[145px]">
                        10000+
                    </h1>
                    <p className="text-lg sm:text-xl text-white w-56">
                        successfully completed tasks
                    </p>
                </div>
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl min-w-[145px]">
                        1500+
                    </h1>
                    <p className="text-lg sm:text-xl text-white w-56">
                        businesses uses Ovioo designs
                    </p>
                </div>
            </div>
            <div className="flex flex-col basis-1/2">
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl min-w-[145px] lg:mr-0">
                        5000+
                    </h1>
                    <p className="text-lg sm:text-xl text-white w-56">
                        Satisfied Customers Worldwide
                    </p>
                </div>
            </div>
        </div>
    </div>
);
