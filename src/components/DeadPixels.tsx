import Image from "next/image";
import Link from "next/link";

export const DeadPixels = () => (
    <div className="err-bg flex justify-center">
        <Link
            href="/"
            className="flex flex-col absolute bottom-[110px] items-center"
        >
            <p className="capitalize mb-3 text-lg text-[#eeeeeee7]">
                take me back to planet earth
            </p>
            <Image
                src="/images/home_btn.png"
                alt="home_btn"
                width={40}
                height={40}
            ></Image>
        </Link>
    </div>
);
