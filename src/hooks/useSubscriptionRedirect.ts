import { AllowedRoutes } from "@/constants/AllowedRoutes";
import { RoleEnum } from "@/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";

const useSubscriptionRedirect = () => {
    const [isRedirecting, setIsRedirecting] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const authUser = useAppSelector((state) => state.userReducer.user);

    useEffect(() => {
        if (authUser) {
            const billingRoute = "/dashboard/billing";
            const authUserSubs = authUser?.teams?.[0]?.subscriptions ?? [];

            if (
                [RoleEnum.User, RoleEnum.Member].includes(authUser.role) &&
                authUserSubs.length < 1 &&
                pathname !== billingRoute
            ) {
                router.push(billingRoute);
            } else if (
                AllowedRoutes[authUser.role] &&
                !AllowedRoutes[authUser.role].includes(pathname)
            ) {
                router.push("/unauthorize");
            } else {
                setIsRedirecting(false);
            }
        }
    }, [authUser, pathname, router]);
    return isRedirecting;
};

export default useSubscriptionRedirect;
