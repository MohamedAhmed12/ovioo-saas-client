"use client";

import "@/styles/app/dashboard/billing.scss";
import { gql, useQuery } from "@apollo/client";
import Script from "next/script";
import { FaArrowLeft } from "react-icons/fa6";

const GENERATE_CUSTOMER_SECRET = gql`
    query GenerateCustomerSecret {
        generateCustomerSecret
    }
`;

export default function Billing() {
    const { data } = useQuery(GENERATE_CUSTOMER_SECRET);

    return (
        data && (
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
                        publishable-key={
                            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                        }
                        customer-session-client-secret={
                            data.generateCustomerSecret
                        }
                    ></stripe-pricing-table>
                </div>
            </div>
        )
    );
}
