import NotificationItem from "@/components/Dashboard/Layout/Header/Notification/NotificationItem";
import { useAppSelector } from "@/hooks/redux";
import { ListNotificationInterface, NotificationInterface } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import IconButton from "@mui/joy/IconButton";
import { Badge, Box, Divider, List, Popover, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UIEvent, useEffect, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import "simplebar-react/dist/simplebar.min.css";

const LIST_NOTIFICATIONS = gql`
    query ListNotifications($data: ListNotificationsDto!) {
        listNotifications(data: $data) {
            notifications {
                id
                content
                action
                is_read
                created_at
                userId
            }
            unreadCount
        }
    }
`;
const NOTIFICATION_SENT = gql`
    subscription Subscription($data: NotificationDto!) {
        notificationReceived(data: $data) {
            id
            content
            is_read
            created_at
            userId
            action
        }
    }
`;
const MARK_AS_READ = gql`
    mutation MarkNotificationAsRead($id: String!) {
        markNotificationAsRead(id: $id) {
            id
            content
            action
            is_read
            created_at
            userId
        }
    }
`;

export default function NotificationPopover() {
    const { data: session } = useSession({ required: true });
    const client = getClient(session);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [page, setPage] = useState<number>(1);

    const router = useRouter();
    const authUser = useAppSelector((state) => state.userReducer.user);

    const { error, data, fetchMore, subscribeToMore } = useQuery(
        LIST_NOTIFICATIONS,
        {
            variables: { data: { page: 1 } },
            fetchPolicy: "cache-and-network",
        }
    );

    const [markNotificationAsRead] = useMutation(MARK_AS_READ, {
        update(cache, { data: { markNotificationAsRead } }) {
            if (!markNotificationAsRead) return;

            const existingData = cache.readQuery<{
                listNotifications: ListNotificationInterface;
            }>({
                query: LIST_NOTIFICATIONS,
                variables: { data: { page: 1 } },
            });

            if (!existingData || !existingData.listNotifications) return;

            const existingNotifications =
                existingData.listNotifications.notifications;

            const updatedNotifications = existingNotifications.map(
                (notification) =>
                    notification.id === markNotificationAsRead.id
                        ? { ...notification, is_read: true }
                        : notification
            );

            cache.writeQuery({
                query: LIST_NOTIFICATIONS,
                variables: { data: { page: 1 } },
                data: {
                    listNotifications: {
                        ...existingData.listNotifications,
                        notifications: updatedNotifications,
                    },
                },
            });
        },
    });

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: NOTIFICATION_SENT,
            variables: { data: { userId: authUser.id } },
            updateQuery: (
                prev: any,
                { subscriptionData }: { subscriptionData: any }
            ) => {
                if (!subscriptionData?.data?.notificationReceived) return prev;

                const newNotification =
                    subscriptionData.data.notificationReceived;
                console.log("subscriptionData.data", subscriptionData.data);

                return {
                    ...prev,
                    listNotifications: {
                        ...prev.listNotifications,
                        unreadCount: prev.listNotifications.unreadCount + 1,
                        notifications: [
                            newNotification,
                            ...prev.listNotifications.notifications,
                        ],
                    },
                };
            },
        });

        return unsubscribe;
    }, [subscribeToMore, authUser.id]);

    if (error) throw new Error(JSON.stringify(error));

    const handleOnScroll = async (event: UIEvent<HTMLElement>) => {
        const target = event.currentTarget;

        if (
            Math.floor(target.scrollHeight - target.scrollTop) ==
            target.clientHeight
        ) {
            const nextPage = page + 1;

            setPage(nextPage);
            await fetchMore({
                variables: {
                    data: {
                        page: nextPage,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    return {
                        ...prev,
                        listNotifications: {
                            ...prev.listNotifications,
                            notifications: [
                                ...prev.listNotifications.notifications,
                                ...fetchMoreResult.listNotifications
                                    .notifications,
                            ],
                        },
                    };
                },
            });
        }
    };
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOnClick = async (notification: NotificationInterface) => {
        await markNotificationAsRead({ variables: { id: notification.id } });
        setAnchorEl(null);
        router.push(notification.action);
    };

    return (
        data?.listNotifications && (
            <div>
                <IconButton
                    className={`notification__icon-button toolbar-icon ${
                        open ? "opened" : "closed"
                    }`}
                    onClick={handleOpen}
                >
                    <Badge
                        badgeContent={data.listNotifications.unreadCount}
                        color="error"
                    >
                        <IoNotificationsSharp size="26" />
                    </Badge>
                </IconButton>

                <Popover
                    open={Boolean(open)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{ maxHeight: 400 }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.5,
                                ml: 0.75,
                                width: 360,
                            },
                            className:
                                "notifications-popover__paper overflow-y-auto",
                            onScroll: handleOnScroll,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 2,
                            px: 2.5,
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">
                                Notifications
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                You have {data.listNotifications.unreadCount}{" "}
                                unread messages
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <List disablePadding>
                        {data.listNotifications.notifications.map(
                            (notification: NotificationInterface) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onClick={() => handleOnClick(notification)}
                                />
                            )
                        )}
                    </List>
                </Popover>
            </div>
        )
    );
}
