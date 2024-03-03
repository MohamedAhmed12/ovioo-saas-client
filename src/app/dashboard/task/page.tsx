"use client";

import Column from "@/components/Dashboard/Task/Column";
import { TaskKanbanColors } from "@/constants/TaskKanbanColors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { DesignerTaskStatus, TaskStatus, UserInterface } from "@/interfaces";
import { pushNewTask, resetTasks, setTasks } from "@/store/features/board";
import "@/styles/app/unauth/home.scss";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LIST_TASKS = gql`
    query ListTasks {
        listTasks {
            id
            title
            status
        }
    }
`;
const TASK_CREATED = gql`
    subscription TaskCreated {
        taskCreated {
            id
            title
            description
            status
        }
    }
`;

export default function Task() {
    const { data: session } = useSession();
    const isDesigner = (session?.data.user as UserInterface)?.isDesigner;
    const tasks = useAppSelector((state) => state.boardReducer.tasks);
    const dispatch = useAppDispatch();
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_TASKS, { fetchPolicy: "no-cache" });

    if (error) throw new Error(JSON.stringify(error));

    const { data: taskCreatedSubsData, loading: taskCreatedSubsLoading } =
        useSubscription(TASK_CREATED);

    const getTaskStatuses = () => {
        if (isDesigner) {
            return Object.keys(DesignerTaskStatus);
        }

        return Object.keys(TaskStatus);
    };

    useEffect(() => {
        if (!graphQLloading && data?.listTasks) {
            dispatch(setTasks(data.listTasks));
        }

        return () => {
            dispatch(resetTasks());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphQLloading, data, data?.listTasks]);
    useEffect(() => {
        if (!taskCreatedSubsLoading && taskCreatedSubsData?.taskCreated) {
            dispatch(pushNewTask(taskCreatedSubsData.taskCreated));
        }
    }, [dispatch, taskCreatedSubsData, taskCreatedSubsLoading]);

    return (
        !graphQLloading &&
        !error &&
        data?.listTasks &&
        tasks && (
            <div
                className={
                    "bg-[#f4f7fd] flex flex-1 dark:bg-[#20212c] gap-6 pb-14 overflow-x-auto"
                }
            >
                {getTaskStatuses().map((key: any) => {
                    const taskStatusKey = key as keyof typeof TaskStatus;

                    return (
                        <Column
                            key={key}
                            title={TaskStatus[taskStatusKey]}
                            color={TaskKanbanColors[taskStatusKey]}
                            tasks={tasks[TaskStatus[taskStatusKey]]}
                        />
                    );
                })}
            </div>
        )
    );
}
