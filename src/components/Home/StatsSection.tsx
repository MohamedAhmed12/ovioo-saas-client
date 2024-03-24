"use client";

import "@/styles/components/home/intro-container.scss";

export const StatsSection = ({ title }: { title?: string }) => (
    <div className="w-full px-[5%] xl:px-[14%] mt-40">
        <div className="text-center max-w-[850px] m-auto">
            <h2 className="text-2xl lg:text-[38px] leading-relaxed font-normal">
                {title}
            </h2>
        </div>
        <div
            className={`stats-container flex flex-wrap ${
                title ? "mt-10" : ""
            }`}
            style={{ color: "#fee4a5" }}
        >
            <div className="flex flex-col flex-1 max-w-full">
                <div className="flex justify-between max-w-full p-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl min-w-[145px]">
                        10000+
                    </h1>
                    <p className="text-lg sm:text-xl text-white w-56">
                        Successfully completed tasks
                    </p>
                </div>
                <div className="flex justify-between max-w-full p-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl min-w-[145px]">
                        1500+
                    </h1>
                    <p className="text-lg sm:text-xl text-white w-56">
                    Businesses trust Ovioo
                    </p>
                </div>
            </div>
            <div className="flex flex-col flex-1 max-w-full">
                <div className="flex justify-between max-w-full p-5">
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
