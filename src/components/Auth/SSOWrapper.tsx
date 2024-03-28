"use client";

import "@/styles/app/auth/login.scss";
import { Button } from "@mui/joy";
import { Divider, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SSOWrapper() {
    const [googleBtnloading, setGoogleBtnloading] = useState(false);
    const [icloudBtnloading, setIcloudBtnloading] = useState(false);

    const searchParam = useSearchParams();
    const callbackUrl = searchParam.get("callbackUrl") || undefined;

    const SSOLogin = (provider: string) =>
        signIn(provider, { callbackUrl: callbackUrl || "/dashboard/task" });

    return (
        <>
            <div className="flex flex-col spacing-2 social-btn-group items-center">
                <Button
                    fullWidth
                    size="lg"
                    variant="outlined"
                    loading={googleBtnloading}
                    onClick={() => {
                        SSOLogin("google");
                        setGoogleBtnloading(true);
                    }}
                >
                    {!googleBtnloading && (
                        <>
                            <Image
                                src="/images/google.png"
                                width={22}
                                height={22}
                                alt="linkedin icon"
                            ></Image>
                            <p className="m-auto text-black">
                                Continue with Google
                            </p>
                        </>
                    )}
                </Button>
                {/* commented for now till I apply for apple developer program */}
                {/* <Button
                    fullWidth
                    size="lg"
                    loading={icloudBtnloading}
                    onClick={() => {
                        SSOLogin("apple");
                        setIcloudBtnloading(true);
                    }}
                    className="!bg-black hover:!bg-black !mt-3"
                >
                    {!icloudBtnloading && (
                        <>
                            <Image
                                src="/images/apple.png"
                                width={22}
                                height={22}
                                alt="apple icon"
                            ></Image>
                            <p className="m-auto">Continue with Apple</p>
                        </>
                    )}
                </Button> */}
            </div>

            <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    OR
                </Typography>
            </Divider>
        </>
    );
}
