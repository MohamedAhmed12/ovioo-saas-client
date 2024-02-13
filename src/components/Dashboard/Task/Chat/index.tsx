"use client";

import { useAppSelector } from "@/hooks/redux";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { TaskInterface } from "@/interfaces";
import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import MessageInput from "./MessageInput";
import MessagesWrapper from "./MessagesWrapper";

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

    if (error) throw new Error(JSON.stringify(error));

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

    return (
        !graphQLloading &&
        data?.listTaskMessages &&
        messages && (
            <div className="chat basis-1/2 flex flex-col rounded-md text-black border-[0.5px] border-gray-600 focus:border-0 mt-[25px] mr-[25px]">
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
        )
    );
}
