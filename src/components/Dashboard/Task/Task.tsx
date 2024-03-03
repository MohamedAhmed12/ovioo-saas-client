import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { SubTaskInterface, TaskInterface } from "@/interfaces";
import { setSelectedTask } from "@/store/features/task";
import { useRouter, useSearchParams } from "next/navigation";
import { DragEvent, useState } from "react";
import TaskModal from "./TaskModal";

export default function Task({ task }: { task: TaskInterface }) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const existInParams = searchParams.get("task");

    let completed = 0;
    let subtasks: SubTaskInterface[] | undefined = task.subtasks;

    if (subtasks) {
        subtasks.forEach((subtask: SubTaskInterface) => {
            if (subtask.isCompleted) {
                completed++;
            }
        });
    }

    const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text", JSON.stringify({ task: task }));
    };
    const handleModalClose = () => {
        setIsTaskModalOpen(false);
        router.push("/dashboard/task");
        dispatch(setSelectedTask(null));
    };

    return (
        <>
            <div
                onClick={() => {
                    setIsTaskModalOpen(true);
                }}
                draggable
                onDragStart={handleOnDrag}
                className="w-[280px] first:my-5 mt-3 py-6 px-3 ovioo-card dark:hover:text-[#0ea5e9] cursor-pointer focus-visible:outline-none"
            >
                <p className="font-bold tracking-wide text-black dark:text-white dark:hover:text-[#0ea5e9] hover:text-[#0ea5e9] truncate">
                    {task.title}
                </p>
                {subtasks && (
                    <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
                        {completed} of {subtasks.length} completed tasks
                    </p>
                )}
            </div>

            {(isTaskModalOpen || existInParams == task.id) && (
                <TaskModal
                    open={true}
                    taskId={task.id}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
}
