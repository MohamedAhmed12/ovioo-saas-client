import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TaskInterface } from "@/interfaces";
import { updateTaskTitle } from "@/store/features/board";
import { setSelectedTask } from "@/store/features/task";
import "@/styles/components/dashboard/task/task-modal.scss";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
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
                name
                members {
                    id
                    avatar
                    fullname
                    isActive
                    role
                }
                subscriptions {
                    status
                }
            }
            designer {
                fullname
                avatar
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

export default function TaskModal({
    open,
    taskId,
    onClose,
}: {
    open: boolean;
    taskId: string;
    onClose: () => void;
}) {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const task: TaskInterface | null = useAppSelector(
        (state) => state.taskReducer.selectedTask
    );
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);

    const [editTask] = useMutation(EDIT_TASK);
    useQuery(SHOW_TASK, {
        variables: { id: taskId },
        fetchPolicy: "no-cache",
        skip: !taskId,
        onCompleted: (data) => dispatch(setSelectedTask(data?.showTask)),
    });

    useSubscription(TASK_UPDATED, {
        variables: { taskId },
        onSubscriptionData: ({ subscriptionData }) => { // Replace with onData as it will deprecate in future
            const updatedTask: TaskInterface & { title: string } =
                subscriptionData?.data?.taskUpdated;

            if (updatedTask && task) {
                dispatch(setSelectedTask({...task, ...updatedTask}));
                if (task?.title !== updatedTask.title) {
                    dispatch(
                        updateTaskTitle({ task, title: updatedTask.title })
                    );
                }
            }
        },
    });

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

                    <div className="flex flex-col-reverse lg:flex-row task__body-wrapper px-[25px]">
                        <TaskModalBody
                            task={task}
                            handleOnChange={handleOnChange}
                        />

                        {!isDesigner && <Chat task={task} />}
                    </div>
                </div>
            </Dialog>
        )
    );
}
