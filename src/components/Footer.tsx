import "@/styles/components/footer.scss";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer w-full relative">
            <div className="rocket-wrapper absolute">
                <Image src="/svg/rocket.svg" alt="rocket" loading="lazy" width="360" height="463" />
            </div>
            <div className="wrapper-footer z-50">
                <div className="footer-menu flex-col lg:flex-row">
                    <div className="adress">
                        <a
                            href="/"
                            aria-current="page"
                            className="footer-logo w-full inline-block w--current"
                        >
                            <Image
                                src="/svg/footer-logo.svg"
                                loading="lazy"
                                alt="ovioo logo"
                                className="footer__logo"
                                width="160"
                                height={35}
                            />
                        </a>
                        <div className="footer__contacts flex flex-col lg:flex-row">
                            <div className="menu-adress-left ">
                                <div className="text-adress">
                                    <p className="text-sm md:text-lg">Ovioo LLC.</p>
                                </div>
                                <div className="contact-text street">
                                <p className="text-sm md:text-lg">
                                        Ovioo is headquartered
                                        <br />
                                        in Wyoming, USA.
                                    </p>
                                </div>
                            </div>
                            <div className="menu-adress-right justify-end">
                                <div className="contact-text phone">
                                    <p className="text-sm md:text-lg"></p>
                                </div>
                                <a
                                    href="mailto:info@ovioo.ai"
                                    className="contact-text email w-full inline-block mt-4 lg:mt-6"
                                >
                                    <p className="text-sm md:text-lg">info@ovioo.ai</p>
                                </a>
                                <a
                                    href="/"
                                    target="_blank"
                                    className="contact-text help-center w-full inline-block lg:mt-0"
                                >
                                    <p className="text-sm md:text-lg">ovioo Help Center</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper_footer hidden lg:flex pt-14">
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/portfolio" className="text-sm md:text-lg">
                                    Portfolio
                                </a>
                            </div>
                            <div className="link_footer mt-3 md:mt-4 lg:mt-7">
                                <a href="/pricing" className="text-sm md:text-lg">
                                    Pricing
                                </a>
                            </div>
                        </div>
                        <div className="col_footer">
                            <div className="link_footer">
                                <a href="/how-it-works" className="text-sm md:text-lg">
                                    How it Works
                                </a>
                            </div>
                            <div className="link_footer mt-3 md:mt-4 lg:mt-7">
                                <a href="/about" className="text-sm md:text-lg">
                                    About Us
                                </a>
                            </div>
                        </div>
                        <div className="col_footer last">
                            <div className="row-footer">
                                <div className="link_footer">
                                    <a href="/" className="text-sm md:text-lg">
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
                            <div className="link_footer last">
                                <a href="/terms" className="text-sm md:text-lg">
                                    Terms &amp; Policies
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper-mobile flex lg:hidden mt-16 lg:mt-20 flex-col w-full">
                        <div className="footer-menu flex flex-wrap">
                            <div className="col_footer">
                                <a href="/portfolio" className="link_footer w-full inline-block">
                                    <p className="text-sm md:text-lg">Portfolio</p>
                                </a>
                                <a href="/pricing" className="link_footer mt-3 md:mt-4 lg:mt-7 w-full inline-block">
                                    <p className="text-sm md:text-lg">Pricing</p>
                                </a>
                                <a
                                    href="/about-us"
                                    className="link_footer mt-3 md:mt-4 lg:mt-7 w-full inline-block"
                                >
                                    <p className="text-sm md:text-lg">About Us</p>
                                </a>
                                <div className="link_footer mt-3 md:mt-4 lg:mt-7">
                                    <a
                                        href="/affiliate-terms-conditions"
                                        className="text-sm md:text-lg"
                                    >
                                        Affiliates
                                    </a>
                                </div>
                            </div>
                            <div className="_2-menu">
                                <a
                                    href="/how-it-works"
                                    className="link_footer w-full inline-block mt-7 sm:mt-0"
                                >
                                    <p className="text-sm md:text-lg">What You Get</p>
                                </a>
                                <a
                                    href="/terms-of-service"
                                    className="link_footer mt-3 md:mt-4 lg:mt-7 w-full inline-block"
                                >
                                    <p className="text-sm md:text-lg">Terms &amp; Policies</p>
                                </a>
                                <div className="link_footer mt-3 md:mt-4 lg:mt-7 mob">
                                    <a href="/" className="text-sm md:text-lg">
                                        Hiring 🔥
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider-footer"></div>
                <div className="social">
                    <div className="container-social">
                        <a
                            data-w-id="00be8c05-2a40-df03-0938-7a2eda4ad09c"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/website-icon.svg"
                                loading="lazy"
                                alt="website"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                        <a
                            data-w-id="05257713-93c8-4f1a-cca5-fada0299f3f2"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/behance-icon.svg"
                                loading="lazy"
                                alt="behance"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                        <a
                            data-w-id="1ccbbd5b-0043-722d-e5b7-cf334eeaa30a"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/fb-icon.svg"
                                loading="lazy"
                                alt="fb"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                        <a
                            data-w-id="eaef8f78-daa9-1285-06f1-d6eaee53138a"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/instagram-icon.svg"
                                loading="lazy"
                                alt="instagram"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                        <a
                            data-w-id="ae77bc4e-f01f-292c-9c9c-e496c8db9764"
                            href="/"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/twitter-icon.svg"
                                loading="lazy"
                                alt="twitter"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                    </div>
                    <div className="footer-motto">
                        <p className="text-sm sm:block md:hidden center mob-ver">
                            Ovioo - awesome
                            <br />
                            on a cosmic level
                        </p>
                        <p className="text-lg hidden md:block center desk">
                            Ovioo - awesome on a cosmic level
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
