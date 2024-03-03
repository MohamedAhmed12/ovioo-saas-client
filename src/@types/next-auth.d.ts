import { UserInterface } from "@/interfaces";
import "next-auth";

declare module "next-auth" {
    interface Session {
        access_token: string;
        data: {
            user: UserInterface;
        };
    }
    interface Profile {
        id: string;
        email_verified?: boolean;
        email?: string;
    }
    interface User {
        provider_id: string;
    }
}

declare module "next-auth/jwt/types" {
    interface JWT {
        provider_id: string;
    }
}
