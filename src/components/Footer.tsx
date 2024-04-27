import "@/styles/components/footer.scss";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer w-full relative">
            <div className="rocket-wrapper absolute">
                <Image
                    src="/svg/rocket.svg"
                    alt="rocket"
                    loading="lazy"
                    width="360"
                    height="463"
                />
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
                                    <p className="text-sm md:text-lg">
                                        Ovioo LLC.
                                    </p>
                                </div>
                                <div className="contact-text street">
                                    <p className="text-sm md:text-lg">
                                        Ovioo is headquartered
                                        <br />
                                        in Wyoming, USA.
                                    </p>
                                </div>
                            </div>
                            <div className="menu-adress-right justify-start">
                                <a
                                    href="mailto:info@ovioo.ai"
                                    className="contact-text email w-full inline-block"
                                >
                                    <p className="text-sm md:text-lg">
                                        info@ovioo.ai
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrapper_footer lg:flex pt-8 lg:pt-14">
                        <div className="col_footer">
                            <div className="link_footer mt-3 md:mt-4 lg:mt-0">
                                <a
                                    href="/portfolio"
                                    className="text-sm md:text-lg"
                                >
                                    Portfolio
                                </a>
                            </div>
                            <div className="link_footer mt-3 md:mt-4 lg:mt-7">
                                <a
                                    href="/pricing"
                                    className="text-sm md:text-lg"
                                >
                                    Pricing
                                </a>
                            </div>
                        </div>
                        <div className="col_footer">
                            <div className="link_footer mt-3 md:mt-4 lg:mt-0">
                                <a
                                    href="/how-it-works"
                                    className="text-sm md:text-lg"
                                >
                                    How it Works
                                </a>
                            </div>
                            <div className="link_footer mt-3 md:mt-4 lg:mt-7">
                                <a href="/terms" className="text-sm md:text-lg">
                                    Terms &amp; Policies
                                </a>
                            </div>
                        </div>
                        <div className="col_footer last">
                            <div className="link_footer mt-3 md:mt-4 lg:mt-[56px]">
                                <a href="/about" className="text-sm md:text-lg">
                                    About Us
                                </a>
                            </div>
                            {/* <div className="link_footer mt-3 md:mt-4 lg:mt-0">
                                    <a href="/" className="text-sm md:text-lg">
                                        Hiring 🔥
                                    </a>
                                </div> 
                                last one will have class => lg:mt-[28px]
                            */}
                        </div>
                    </div>
                </div>
                <div className="divider-footer"></div>
                <div className="social">
                    <div className="container-social">
                        <a
                            data-w-id="05257713-93c8-4f1a-cca5-fada0299f3f2"
                            href="https://snapchat.com/t/YaepQCbZ"
                            target="_blank"
                            className="social-logo w-full inline-block"
                        >
                            <Image
                                src="/icons/snapchat.svg"
                                loading="lazy"
                                alt="snapchat"
                                className="ico-img"
                                height={80}
                                width={80}
                            />
                        </a>
                        <a
                            data-w-id="eaef8f78-daa9-1285-06f1-d6eaee53138a"
                            href="https://www.instagram.com/ovioo2/"
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
                            data-w-id="1ccbbd5b-0043-722d-e5b7-cf334eeaa30a"
                            href="https://www.facebook.com/OviooDesigns"
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
                            data-w-id="ae77bc4e-f01f-292c-9c9c-e496c8db9764"
                            href="https://twitter.com/OviooDesigns"
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
                            Ovioo - awesomeness
                            <br />
                            on a cosmic level
                        </p>
                        <p className="text-lg hidden md:block center desk">
                            Ovioo - awesomeness on a cosmic level
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
