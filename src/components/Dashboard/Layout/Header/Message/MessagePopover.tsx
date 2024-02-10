import { useAppSelector } from "@/hooks/redux";
import { TaskInterface, Team } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import IconButton from "@mui/joy/IconButton";
import { Badge, Box, Divider, List, Popover, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import MessageItem from "./MessageItem";

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

    const authUser = useAppSelector((state) => state.userReducer.user);
    const openedModalTask = useAppSelector(
        (state) => state.taskReducer.selectedTask
    );
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [receiveTaskMessages] = useMutation(RECEIVE_MESSAGES, { client });
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_UNREAD_MESSAGES, {
        client,
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error(JSON.stringify(error));

    const { data: messageSentSubsData, loading: messageSentSubsLoading } =
        useSubscription(MESSAGE_SENT, {
            variables: {
                data: {
                    teamIds: authUser.teams.map((team: Team) => team.id),
                },
            },
            client,
        });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (
            !messageSentSubsLoading &&
            messageSentSubsData?.messageSent &&
            data?.listUnreadMessages
        ) {
            // if task modal/chat alreay opened then no need to proceed
            if (
                openedModalTask &&
                openedModalTask.id == messageSentSubsData.messageSent.task.id
            )
                return;

            // if task exist in listUnreadMessages
            const taskIndex = data.listUnreadMessages.findIndex(
                (task: Partial<TaskInterface>) =>
                    task.id == messageSentSubsData.messageSent.task.id
            );

            if (taskIndex !== -1) {
                data.listUnreadMessages[taskIndex].messages = [
                    messageSentSubsData.messageSent,
                ];
                data.listUnreadMessages[taskIndex].unreadMessagesCount =
                    data.listUnreadMessages[taskIndex].unreadMessagesCount + 1;
                setAllUnreadMsgsCount((prevCount) => prevCount + 1);
            } else {
                data.listUnreadMessages.push({
                    id: messageSentSubsData.messageSent.task.id,
                    messages: [
                        {
                            id: messageSentSubsData.messageSent.id,
                            content: messageSentSubsData.messageSent.content,
                            status: messageSentSubsData.messageSent.status,
                            created_at:
                                messageSentSubsData.messageSent.created_at,
                            sender: {
                                fullname:
                                    messageSentSubsData.messageSent.sender
                                        .fullname,
                                avatar: messageSentSubsData.messageSent.sender
                                    .avatar,
                            },
                        },
                    ],
                    unreadMessagesCount: 1,
                });
                setAllUnreadMsgsCount((prevCount) => prevCount + 1);
            }

            receiveTaskMessages({
                variables: {
                    taskId: messageSentSubsData.messageSent.task.id,
                },
            });
        }
    }, [messageSentSubsData, messageSentSubsLoading]);
    useEffect(() => {
        if (data?.listUnreadMessages) {
            const allUnreadMsgsCount = data?.listUnreadMessages.reduce(
                (acc: number, task: TaskInterface) => {
                    receiveTaskMessages({ variables: { taskId: task.id } });

                    if (task.unreadMessagesCount) {
                        return acc + task.unreadMessagesCount;
                    }
                },
                0
            );

            setAllUnreadMsgsCount(allUnreadMsgsCount);
        }
    }, [data]);
    useEffect(() => {
        if (openedModalTask && data?.listUnreadMessages) {
            data.listUnreadMessages = data.listUnreadMessages.filter(
                (task: Partial<TaskInterface>) => {
                    if (task.id != openedModalTask.id) return task;

                    if (!task?.unreadMessagesCount) return;

                    setAllUnreadMsgsCount((prevCount) =>
                        prevCount == 0
                            ? 0
                            : prevCount - (task?.unreadMessagesCount as number)
                    );
                }
            );
        }
    }, [openedModalTask, data]);

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
                                "notifications-popover__paper custom-scrollbar",
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
                            <MessageItem key={+task.id} task={task} />
                        ))}
                    </List>
                </Popover>
            </div>
        )
    );
}
