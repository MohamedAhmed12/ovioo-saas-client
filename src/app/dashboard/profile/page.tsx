"use client";

import NotificationSetting from "@/components/Dashboard/Profile/NotificationSetting";
import PasswordSetting from "@/components/Dashboard/Profile/PasswordSetting";
import ProfileSetting from "@/components/Dashboard/Profile/ProfileSetting";
import { useAppSelector } from "@/hooks/redux";

export default function Profile() {
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        user && (
            <div className="profilepage px-40 flex flex-col lg:flex-col w-full">
                <div className="profile-setting">
                    <ProfileSetting user={user} />
                </div>
                <div className="notification-setting">
                    <NotificationSetting />
                </div>
                <div className="password-setting">
                    <PasswordSetting user={user} />
                </div>
            </div>
        )
    );
}
