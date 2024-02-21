import CreditCard from "@/components/Dashboard/Payment/CreditCard";
import SubscriptionCard from "@/components/Dashboard/Payment/SubscriptionCard";

export default function Payment() {
    return (
        <div className="dashboard-payment">
            <CreditCard />
            <SubscriptionCard />
        </div>
    );
}
