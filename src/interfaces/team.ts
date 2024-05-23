import { Subscription } from "./subscription";
import { RoleEnum } from "./user";

export interface Team {
    id: string;
    name: string;
    owner_id: string;
    card_last4?: string;
    members: Member[];
    subscriptions?: Subscription[];
}

export interface Member {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
    isActive: boolean;
    role?: RoleEnum;
}
