"use client";

import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { dragTask } from "@/store/features/board";
import { gql, useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import { DragEvent, useState } from "react";
import toast from "react-hot-toast";
import CreateTaskBackdrop from "./CreateTaskBackdrop";
import Task from "./Task";

const EDIT_TASK = gql`
    mutation updateTask($data: UpdateTaskDto!) {
        updateTask(data: $data) {
            id
        }
    }
`;

export default function Column({
    tasks,
    title,
    color,
}: {
    tasks: TaskInterface[];
    title: TaskStatus;
    color: string;
}) {
    const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const [editTask] = useMutation(EDIT_TASK);

    const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
        const { task } = JSON.parse(e.dataTransfer.getData("text"));
        const oldStatus = task.status;

        if (oldStatus !== title) {
            task.status = title;

            try {
                await editTask({
                    variables: {
                        data: task,
                    },
                });
                dispatch(dragTask({ task, oldStatus }));
            } catch (e: any) {
                toast.error("Something went wrong!");
            }
        }
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className="column mx-5 min-w-[280px] "
        >
            <p className="font-semibold flex items-center gap-2 mb-4 tracking-widest md:tracking-[.2em]">
                <span
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: `${color}` }}
                ></span>
                {title} ({tasks?.length || 0})
            </p>

            {tasks &&
                tasks.map((task, index) => <Task key={index} task={task} />)}

            <Typography
                variant="body1"
                className="new-task-btn !mt-4 capitalize font-bold text-[#0ea5e9] cursor-pointer"
                onClick={() => setOpenCreateTask(true)}
            >
                + new task
            </Typography>

            {openCreateTask && (
                <CreateTaskBackdrop
                    open={openCreateTask}
                    status={title}
                    handleClose={() => setOpenCreateTask(false)}
                />
            )}
        </div>
    );
}
