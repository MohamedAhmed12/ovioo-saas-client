import { Subscription } from "./subscription";

export interface Team {
    id: string;
    owner_id: string;
    members: Member[];
    subscriptions: Subscription[];
}

export interface Member {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
    isActive: boolean;
}
