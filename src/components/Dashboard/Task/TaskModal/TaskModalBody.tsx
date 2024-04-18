import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TaskInterface } from "@/interfaces";
import { updateTaskTitle } from "@/store/features/board";
import { ChangeEvent } from "react";
import Attachement from "./Attachement";

export default function TaskModalBody({
    task,
    handleOnChange,
}: {
    task: TaskInterface;
    handleOnChange: (name: string, value: any) => void;
}) {
    const dispatch = useAppDispatch();
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleOnChange("title", e.target.value);
        dispatch(updateTaskTitle({ task, title: e.target.value }));
    };
    return (
        <div
            className={`task-modal__body pt-16 lg:pr-[25px] ${
                !isDesigner ? "basis-1/2" : ""
            }`}
        >
            <input
                value={task.title}
                onChange={handleTitleChange}
                id="task-name-input"
                type="text"
                className="bg-transparent w-full px-4 py-2 outline-none focus:border-0 rounded-md text-3xl border-[0.5px] border-gray-400 focus:outline-[#635fc7] outline-1 ring-0"
                placeholder="Title e.g Create a landing page design"
                disabled={isDesigner}
            />
            <textarea
                value={task.description}
                onChange={(e) => handleOnChange("description", e.target.value)}
                id="task-description-input"
                className="mt-8 w-full  bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-400 focus:outline-[#635fc7] outline-[1px]"
                placeholder="Description e.g. we need to craft a visually engaging and user-friendly landing page design. The goal is to create a compelling online presence that effectively communicates the brand identity."
                disabled={isDesigner}
            />

            <Attachement task={task} />
        </div>
    );
}
