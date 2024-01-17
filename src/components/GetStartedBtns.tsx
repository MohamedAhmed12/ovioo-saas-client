import "@/styles/components/get-started-btns.scss";
import AnimatedBtn from "./AnimatedBtn";
import Link from "next/link";

export const GetStartedBtns = () => (
    <div className="get-started_btn-container">
        <Link
            href="/auth/register"
            className="ghost-button-wrap new-cta_7for7 w-inline-block"
        >
            <div className="ghost-button new-cta">
                <div className="buttons-l">Get started</div>
            </div>
        </Link>
        <AnimatedBtn title="Book a Demo" />
    </div>
);

export default GetStartedBtns;
