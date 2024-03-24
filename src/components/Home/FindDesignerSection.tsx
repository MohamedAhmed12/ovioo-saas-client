import "@/styles/components/home/find-designer.scss";
import Image from "next/image";

export const FindDesignerSection = () => (
    <div className="public-container find-designer flex flex-col lg:flex-row mt-32 max-w-[1250px] px-[7%]">
        <h2 className="basis-1/2 text-xl leading-normal sm:text-3xl lg:text-4xl lg:leading-normal font-bold mb-16 lg:mb-8 lg:m-0">
            Finding a <span className="text-secondary">designer</span> can be quite challenging. Doing it over and over again
            for every new task? <span className="text-red-600">Ugh, no thanks!</span>
            <br />
            <br />
            Sit back and relax with <span className="text-secondary">Ovioo</span>. We got you.
        </h2>
        <div className="flex text-3xl basis-1/2 justify-center lg:justify-end">
            <Image src="/images/smile.png" alt="smile" width={610} height={700} className="max-w-[245px] md:max-w-[300px] lg:max-w-[363px]"/>
        </div>
    </div>
);
