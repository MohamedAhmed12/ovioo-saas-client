"use client";

import Column from "@/components/Dashboard/Task/Column";
import { TaskKanbanColors } from "@/constants/TaskKanbanColors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { DesignerTaskStatus, TaskStatus } from "@/interfaces";
import { pushNewTask, setTasks } from "@/store/features/board";
import "@/styles/app/unauth/home.scss";
import { gql, useQuery, useSubscription } from "@apollo/client";
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
    const tasks = useAppSelector((state) => state.boardReducer.tasks);
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);
    const dispatch = useAppDispatch();
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_TASKS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            dispatch(setTasks(data.listTasks)); // if need to reset tasks use resetTasks
        },
    });

    if (error) throw new Error(JSON.stringify(error));

    useSubscription(TASK_CREATED, {
        onData: ({ data }) => {
            dispatch(pushNewTask(taskCreatedSubsData.taskCreated));
        },
    });

    const getTaskStatuses = () => {
        if (isDesigner) {
            return Object.keys(DesignerTaskStatus);
        }

        return Object.keys(TaskStatus);
    };

    return (
        !graphQLloading &&
        !error &&
        data?.listTasks &&
        tasks && (
            <div
                className={
                    "bg-[#FFF] flex flex-1 dark:bg-[#20212c] gap-6 pb-14 overflow-x-auto"
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
