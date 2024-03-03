import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TaskInterface, UserInterface } from "@/interfaces";
import { updateTaskTitle } from "@/store/features/board";
import { setSelectedTask } from "@/store/features/task";
import "@/styles/components/dashboard/task/task-modal.scss";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Chat from "../Chat";
import TaskModalBody from "./TaskModalBody";
import TaskModalHeader from "./TaskModalHeader";

const SHOW_TASK = gql`
    query ShowTask($id: String!) {
        showTask(id: $id) {
            id
            designer {
                id
                fullname
                avatar
            }
            description
            title
            status
            project {
                id
            }
            type {
                id
            }
            assets {
                id
                src
                alt
                type
            }
            subtasks {
                id
                title
                status
            }
            team {
                id
                members {
                    id
                    avatar
                    fullname
                    isActive
                }
            }
        }
    }
`;
const TASK_UPDATED = gql`
    subscription TaskUpdated($taskId: String!) {
        taskUpdated(taskId: $taskId) {
            id
            designer {
                id
                fullname
                avatar
            }
            description
            title
            status
            project {
                id
            }
            type {
                id
            }
            assets {
                id
                src
                alt
                type
            }
            subtasks {
                id
                title
                status
            }
            team {
                id
                members {
                    id
                    avatar
                    fullname
                    isActive
                }
            }
        }
    }
`;
const EDIT_TASK = gql`
    mutation updateTask($data: UpdateTaskDto!) {
        updateTask(data: $data) {
            id
        }
    }
`;
const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
        }
    }
`;

export default function TaskModal({
    open,
    taskId,
    onClose,
}: {
    open: boolean;
    taskId: string;
    onClose: () => void;
}) {
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const theme = useTheme();
    const session = useSession();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const task: TaskInterface | null = useAppSelector(
        (state) => state.taskReducer.selectedTask
    );
    const isDesigner = (session?.data?.user as UserInterface)?.isDesigner;

    const [editTask] = useMutation(EDIT_TASK);
    const {
        loading: graphQLloading,
        error: showTaskError,
        data: showTaskData,
    } = useQuery(SHOW_TASK, {
        variables: {
            id: taskId,
        },
        fetchPolicy: "no-cache",
    });

    if (showTaskError) throw new Error(showTaskError.message);

    const { error: listProjectError, data: listProjectData } = useQuery(
        LIST_PROJECTS,
        {
            fetchPolicy: "no-cache",
        }
    );

    if (listProjectError) throw new Error(JSON.stringify(listProjectError));

    const { data: taskUpdatedSubsData, loading: taskUpdatedSubsLoading } =
        useSubscription(TASK_UPDATED, { variables: { taskId } });

    useEffect(() => {
        const updatedTask: TaskInterface & { title: string } =
            taskUpdatedSubsData?.taskUpdated;

        if (!taskUpdatedSubsLoading && task && updatedTask) {
            if (task.title != updatedTask.title) {
                dispatch(updateTaskTitle({ task, title: updatedTask.title }));
            }

            dispatch(setSelectedTask(updatedTask));
        }
    }, [taskUpdatedSubsData, taskUpdatedSubsLoading]);
    useEffect(() => {
        if (!graphQLloading && showTaskData?.showTask) {
            dispatch(setSelectedTask(showTaskData?.showTask));
            setInitialDataLoaded(true);
        }
    }, [graphQLloading, showTaskData, showTaskData?.showTask]);

    const handleOnChange = (name: string, value: any) =>
        dispatch(setSelectedTask({ ...task, [name]: value }));

    const onSubmit = async () => {
        if (!task) return;
        try {
            const { designer, assets, subtasks, team, ...restTask } = task;
            await editTask({
                variables: {
                    data: restTask,
                },
            });
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        onClose();
    };

    return (
        initialDataLoaded &&
        listProjectData?.listProjects &&
        task && (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onSubmit}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        width: !isDesigner ? "85%" : "auto",
                        maxWidth: "85%",
                    },
                }}
                className="task-modal"
            >
                <div className="flex flex-col my-auto mx-auto w-full ovioo-card with-shadow py-8 px-0">
                    <TaskModalHeader
                        task={task}
                        onClose={onClose}
                        handleOnChange={handleOnChange}
                    />

                    <div className="flex flex-col-reverse lg:flex-row task__body-wrapper">
                        <TaskModalBody
                            task={task}
                            handleOnChange={handleOnChange}
                            projects={listProjectData.listProjects}
                        />

                        {!isDesigner && <Chat task={task} />}
                    </div>
                </div>
            </Dialog>
        )
    );
}
