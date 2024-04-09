import { Subscription } from "@/interfaces/subscription";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IoMdTime } from "react-icons/io";

export default async function CreditCard({
    subscription,
}: {
    subscription: Subscription;
}) {
    return (
        subscription && (
            <Card className="ovioo-card with-shadow min-w-[300px] max-w-[350px] rounded-[10px] my-6">
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        className="!text-[28px]"
                    >
                        Credit
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                        className="!my-5 !text-[45px]"
                    >
                        {subscription.remaining_credit_hours}
                        <span className="inline-flex text-[28px] items-end">
                            {" "}
                            <span className="ml-2 mr-1">hrs</span> 
                            <IoMdTime size="20" className="mb-1" />
                        </span>
                    </Typography>
                </CardContent>
            </Card>
        )
    );
}
