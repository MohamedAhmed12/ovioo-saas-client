import BottomWrapper from "@/components/BottomWrapper";
import { StatsSection } from "@/components/Home/StatsSection";
import PlansCard from "@/components/Pricing/PlansCard";
import PlansHelpCard from "@/components/Pricing/PlansHelpCard";
import { FAQ as FAQInterface } from "@/interfaces";
import { PlanInterface } from "@/interfaces/plan";
import "@/styles/app/unauth/pricing.scss";
import { getClient } from "@/utils/getClient";
import { gql } from "@apollo/client";
import Box from "@mui/joy/Box";

const LIST_PLANS = gql`
    query ListPlans {
        listPlans {
            id
            title
            description
            services
            background_color
            daily_fees
            monthly_fees
            is_full_time
            is_most_popular
        }
    }
`;
const faq: FAQInterface[] = [
    {
        question: "Every day business updates - what’s that?",
        answer: "Every business day, your designer will provide you with an update on your task, or switch to a new one when it's completed.",
    },
    {
        question: "How many designs do I get in a month?",
        answer: "This depends on the complexity and number of iterations for each task. Every task is different, but we guarantee you will receive daily design updates.",
    },
];

export default async function Pricing() {
    const client = await getClient();
    let data;

    try {
        const res = await client?.query({ query: LIST_PLANS });
        if (res) {
            data = res.data;
        }
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }

    return (
        data.listPlans && (
            <div className="w-full">
                <div className="intro flex mt-36 mb-14 justify-center">
                    <div className="container title text-center px-5">
                        <h3 className="uppercase text-4xl md:text-5xl">
                            Memberships levels
                        </h3>
                        <h5 className="text-xl md:text-2xl mt-3 pr-2">
                            Choose a plan
                            <span className="text-gradient">
                                {` that's right for you.`}
                            </span>
                        </h5>
                    </div>
                </div>

                <Box className="flex flex-wrap justify-center w-full px-[9%] gap-x-9">
                    {data.listPlans.map((plan: PlanInterface) => (
                        <PlansCard {...plan} key={plan.title} />
                    ))}
                </Box>

                <PlansHelpCard />
                <StatsSection title="Replace your entire design department with a single subscription" />
                <BottomWrapper faq={faq} />
            </div>
        )
    );
}
