"use client";

import { useAppSelector } from "@/hooks/redux";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Member, RoleEnum, TaskInterface } from "@/interfaces";
import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { Avatar, Tooltip } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import MessageInput from "./MessageInput";
import MessagesWrapper from "./MessagesWrapper";

const NUM_SHOWN_ACTIVE_USERS = 3;

const USER_STATUS_CHANGED = gql`
    subscription UserStatusChanged {
        userStatusChanged {
            id
            avatar
            fullname
            isActive
        }
    }
`;

const LIST_MESSAGES = gql`
    query ListMessages($data: ListMessageDto!) {
        listTaskMessages(data: $data) {
            id
            content
            voice_note_src
            status
            received_by
            read_by
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
            created_at
        }
    }
`;
const SEND_MESSAGE = gql`
    mutation sendMessage($data: SendMessageDto!) {
        sendMessage(data: $data) {
            id
            content
            voice_note_src
            status
            received_by
            read_by
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
            created_at
        }
    }
`;
const READ_MESSAGES = gql`
    mutation ReceiveAllSentMessages($taskId: String!) {
        readTaskMessages(taskId: $taskId)
    }
`;

export default function Chat({ task }: { task: TaskInterface }) {
    const [activeUsers, setActiveUsers] = useState<Member[]>(
        task?.team?.members.filter(
            (member) => member.isActive && member.role != RoleEnum.Designer
        ) || []
    );
    const authUser = useAppSelector((state) => state.userReducer.user);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<any[]>([]);

    const [sendMessage] = useMutation(SEND_MESSAGE);
    const [readTaskMessages] = useMutation(READ_MESSAGES);
    const {
        loading: graphQLloading,
        error,
        data,
        fetchMore,
        subscribeToMore,
    } = useCustomQuery(
        LIST_MESSAGES,
        { task_id: task.id, page: 1 },
        "network-only",
        "network-only"
    );
    const { loading: userStatusChangedLoading, data: userStatusChangedData } =
        useSubscription(USER_STATUS_CHANGED);

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!userStatusChangedLoading && userStatusChangedData) {
            const changedUser = userStatusChangedData.userStatusChanged;
            const changedUserIndex: number = activeUsers.findIndex(
                (user) => user.id == changedUser.id
            );

            if (changedUser.isActive == true && changedUserIndex == -1) {
                setActiveUsers((users) => [...users, changedUser]);
            }
            if (changedUser.isActive == false && changedUserIndex != -1) {
                setActiveUsers((users) =>
                    users.filter((user) => user.id !== changedUser.id)
                );
            }
        }
    }, [activeUsers, userStatusChangedData, userStatusChangedLoading]);

    useEffect(() => {
        if (data?.listTaskMessages && data?.listTaskMessages?.length > 0) {
            const msgs = data.listTaskMessages;
            const read: MessageInterface[] = [];
            const unread: MessageInterface[] = [];

            msgs.forEach((msg: MessageInterface) => {
                msg.sender?.id == authUser.id ||
                (msg.status == MessageStatusEnum.READ &&
                    msg.read_by.includes(` ${authUser.fullname}`))
                    ? read.push(msg)
                    : unread.push(msg);
            });

            setMessages(read);
            setUnreadMessages(unread);
            readTaskMessages({ variables: { taskId: task.id } });
        }
    }, [data]);

    const handleSendMessage = async (
        sendMessageData: Partial<MessageInterface>
    ) => {
        const { sender, created_at, isFailed, ...msg } = sendMessageData;

        try {
            // // send message
            const { data } = await sendMessage({
                variables: {
                    data: msg,
                },
            });
        } catch (e: any) {
            const { id, avatar, fullname } = authUser;
            const newMessage = {
                ...sendMessageData,
                sender: { id, avatar, fullname },
                created_at: Date(),
            };
            newMessage.isFailed = true;

            setMessages((message) => [...message, newMessage]);
        }
    };
    const getNumberOfExtraAvatar = (usersCount: any) => {
        if (activeUsers?.length == 0) return 0;

        return usersCount - NUM_SHOWN_ACTIVE_USERS <= 99
            ? `+${usersCount - NUM_SHOWN_ACTIVE_USERS}`
            : +99;
    };

    return (
        !graphQLloading &&
        data?.listTaskMessages &&
        messages && (
            <div className="chat flex flex-col basis-1/2 mt-1">
                {activeUsers && activeUsers?.length > 0 && (
                    <AvatarGroup
                        slotProps={{
                            additionalAvatar: {
                                slot: "testasasd",
                                contextMenu: "ssada",
                            },
                        }}
                    >
                        {activeUsers
                            .slice(0, NUM_SHOWN_ACTIVE_USERS)
                            .map((member) => (
                                <Badge
                                    key={member.id}
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    variant="dot"
                                >
                                    <Tooltip title={member.fullname}>
                                        <Avatar
                                            alt={member.fullname}
                                            src={member.avatar}
                                        />
                                    </Tooltip>
                                </Badge>
                            ))}

                        {activeUsers.length > NUM_SHOWN_ACTIVE_USERS && (
                            <Tooltip
                                title={activeUsers
                                    .slice(NUM_SHOWN_ACTIVE_USERS)
                                    .map((member) => (
                                        <span
                                            key={member.id}
                                            className="flex flex-wrap"
                                        >
                                            {member.fullname}
                                        </span>
                                    ))}
                            >
                                <Avatar>
                                    {getNumberOfExtraAvatar(activeUsers.length)}
                                </Avatar>
                            </Tooltip>
                        )}
                    </AvatarGroup>
                )}

                <div className="flex flex-1 flex-col flex-wrap mt-4 text-black focus:border-0 rounded-md border-[0.5px] border-gray-400 max-h-[700px] bg-[lightgray] relative">
                    <MessagesWrapper
                        task={task}
                        setShowPicker={setShowPicker}
                        setMessages={setMessages}
                        messages={messages}
                        setUnreadMessages={setUnreadMessages}
                        unreadMessages={unreadMessages}
                        handleSendMessage={handleSendMessage}
                        fetchMore={fetchMore}
                        subscribeToMore={subscribeToMore}
                        readTaskMessages={readTaskMessages}
                    />
                    <MessageInput
                        task_id={task.id}
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        onMessageSend={handleSendMessage}
                    />
                </div>
            </div>
        )
    );
}
