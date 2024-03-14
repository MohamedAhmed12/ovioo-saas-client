import "@/styles/components/home/find-designer.scss";
import Image from "next/image";

export const FindDesignerSection = () => (
    <div className="public-container find-designer flex flex-col lg:flex-row mt-32 max-w-[1250px]">
        <h2 className="text-2xl lg:text-4xl basis-1/2 font-bold mb-8 lg:m-0">
            Finding a <span className="text-secondary">designer</span> can be quite challenging. Doing it over and over again <br />
            for every new task? <span className="text-red-600">Ugh, no thanks!</span>
            <br />
            <br />
            Sit back and relax with <span className="text-secondary">Ovioo</span>. We got you.
        </h2>
        <div className="flex text-3xl basis-1/2 justify-end">
            <Image src="/images/smile.png" alt="smile" width={610} height={700} className="max-w-[363px] max-h-[445px]"/>
        </div>
    </div>
);
