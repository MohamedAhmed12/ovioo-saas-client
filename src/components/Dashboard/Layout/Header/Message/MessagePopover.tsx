import { useAppSelector } from "@/hooks/redux";
import { TaskInterface, Team } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import IconButton from "@mui/joy/IconButton";
import { Badge, Box, Divider, List, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import "simplebar-react/dist/simplebar.min.css";
import MessageItem from "./MessageItem";
import { useRouter } from "next/navigation";

const LIST_UNREAD_MESSAGES = gql`
    query ListUnreadMessages {
        listUnreadMessages {
            id
            messages {
                id
                content
                status
                created_at
                sender {
                    fullname
                    avatar
                }
            }
            unreadMessagesCount
        }
    }
`;
const MESSAGE_SENT = gql`
    subscription Subscription($data: MessageSentSubscriptionDto!) {
        messageSent(data: $data) {
            id
            content
            voice_note_src
            asset {
                id
                src
                alt
                type
            }
            sender {
                id
                fullname
                avatar
            }
            task {
                id
            }
            created_at
        }
    }
`;
const RECEIVE_MESSAGES = gql`
    mutation ReceiveTaskMessages($taskId: String!) {
        receiveTaskMessages(taskId: $taskId)
    }
`;

export default function MessagePopover() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [allUnreadMsgsCount, setAllUnreadMsgsCount] = useState<number>(0);

    const router = useRouter();
    const authUser = useAppSelector((state) => state.userReducer.user);
    const openedModalTask = useAppSelector(
        (state) => state.taskReducer.selectedTask
    );

    const [receiveTaskMessages] = useMutation(RECEIVE_MESSAGES);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_UNREAD_MESSAGES, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            const unreadMessages = data?.listUnreadMessages || [];

            let totalUnreadCount = unreadMessages.reduce(
                (acc: number, task: TaskInterface) => {
                    receiveTaskMessages({ variables: { taskId: task.id } });

                    if (!openedModalTask || task.id !== openedModalTask?.id) {
                        return acc + (task.unreadMessagesCount || 0);
                    }
                },
                0
            );

            setAllUnreadMsgsCount(totalUnreadCount);
        },
    });

    if (error) throw new Error(JSON.stringify(error));

    const { loading } = useSubscription(MESSAGE_SENT, {
        variables: {
            data: {
                teamIds: authUser.teams.map((team: Team) => team.id),
            },
        },
        onData: (subscriptionData) => {
            const existedMsgs = data?.listUnreadMessages;
            const sentMsg = subscriptionData?.data?.data?.messageSent;
            if (existedMsgs && sentMsg) {
                // if task modal/chat alreay opened then no need to proceed
                if (openedModalTask?.id == sentMsg.task.id) return;

                // if task exist in listUnreadMessages
                const taskIndex = data.listUnreadMessages.findIndex(
                    (task: Partial<TaskInterface>) => task.id == sentMsg.task.id
                );

                if (taskIndex !== -1) {
                    existedMsgs[taskIndex].messages = [sentMsg];
                    existedMsgs[taskIndex].unreadMessagesCount++;
                } else {
                    existedMsgs.push({
                        id: sentMsg.task.id,
                        messages: [
                            {
                                id: sentMsg.id,
                                content: sentMsg.content,
                                status: sentMsg.status,
                                created_at: sentMsg.created_at,
                                sender: {
                                    fullname: sentMsg.sender.fullname,
                                    avatar: sentMsg.sender.avatar,
                                },
                            },
                        ],
                        unreadMessagesCount: 1,
                    });
                }

                setAllUnreadMsgsCount((prevCount) => prevCount + 1);
                receiveTaskMessages({
                    variables: {
                        taskId: sentMsg.task.id,
                    },
                });
            }
        },
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnClick = (task: TaskInterface) => {
        const taskIndex = data.listUnreadMessages.findIndex(
            (elm: Partial<TaskInterface>) => elm.id == task.id
        );

        if (taskIndex !== -1) {
            data.listUnreadMessages.splice(taskIndex, 1);
            setAnchorEl(null);
            setAllUnreadMsgsCount(
                (prevCount) => prevCount - (task?.unreadMessagesCount || 0)
            );
        }

        router.push(`/dashboard/task?task=${task.id}`);
    };

    return (
        !graphQLloading &&
        data.listUnreadMessages && (
            <div>
                <IconButton
                    className={` toolbar-icon ${open ? "opened" : "closed"}`}
                    onClick={handleClick}
                >
                    <Badge badgeContent={allUnreadMsgsCount} color="error">
                        <TbMessageCircle2Filled size="26" />
                    </Badge>
                </IconButton>

                <Popover
                    open={Boolean(open)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.5,
                                ml: 0.75,
                                width: 360,
                            },
                            className:
                                "notifications-popover__paper",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 2,
                            px: 2.5,
                            flexGrow: 1,
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1">Chats</Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                You have {allUnreadMsgsCount} unread messages
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <List disablePadding>
                        {data?.listUnreadMessages.map((task: TaskInterface) => (
                            <MessageItem
                                key={+task.id}
                                task={task}
                                onClick={() => handleOnClick(task)}
                            />
                        ))}
                    </List>
                </Popover>
            </div>
        )
    );
}
