"use client";

import { useAppSelector } from "@/hooks/redux";
import "@/styles/app/dashboard/billing.scss";
import Script from "next/script";
import { FaArrowLeft } from "react-icons/fa6";

export default function Billing() {
    const authUser = useAppSelector((state) => state.userReducer.user);

    return (
        <div className="billing flex flex-col !bg-white z-[9999] pb-10">
            <header className="px-8 py-5 font-medium">
                <button
                    className="flex items-center text-black"
                    onClick={() => window.history.back()}
                >
                    <div className="mr-2">
                        <FaArrowLeft />
                    </div>
                    Back
                </button>
            </header>

            <div className="flex-1 flex flex-col place-content-center">
                <Script
                    async
                    src="https://js.stripe.com/v3/pricing-table.js"
                ></Script>
                <stripe-pricing-table
                    pricing-table-id={
                        process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID
                    }
                    publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                    client-reference-id={
                        authUser.teams[0].stripe_client_reference_id
                    }
                ></stripe-pricing-table>
            </div>
        </div>
    );
}
