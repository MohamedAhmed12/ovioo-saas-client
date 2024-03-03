import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { RoleEnum, UserInterface } from "./interfaces";

export async function middleware(req: NextRequest) {
    const requestForNextAuth = {
        headers: {
            cookie: req.headers.get("cookie") || undefined,
        },
    };

    const session = await getSession({ req: requestForNextAuth });

    if (session) {
        const authUser = session.user as UserInterface;
        const billingRoute = new URL(
            "/dashboard/billing",
            process.env.NEXTAUTH_URL
        );
        const currentPath = new URL(req.url, process.env.NEXTAUTH_URL).pathname;
        const authUserSubs = authUser?.teams?.[0]?.subscriptions ?? [];

        if (
            [RoleEnum.User, RoleEnum.Member].includes(authUser.role) &&
            authUserSubs.length < 1 &&
            currentPath != billingRoute.pathname
        ) {
            return NextResponse.redirect(billingRoute);
        }
    }
}

export const config = { matcher: ["/dashboard/:path*"] };
