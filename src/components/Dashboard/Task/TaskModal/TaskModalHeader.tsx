import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { deleteTask as deleteTaskAction } from "@/store/features/board";
import { gql, useMutation } from "@apollo/client";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import OviooDropDown from "../../OviooDropDown";

const DELETE_TASK = gql`
    mutation Mutation($id: String!) {
        deleteTask(id: $id)
    }
`;

export default function TaskModalHeader({
    task,
    onClose,
    handleOnChange,
}: {
    task: TaskInterface;
    onClose: (val: boolean) => void;
    handleOnChange: (name: string, value: any) => void;
}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);
    const [deleteTask] = useMutation(DELETE_TASK);

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const onDeleteBtnClick = async (e: MouseEvent<HTMLElement>) => {
        try {
            const { data } = await deleteTask({
                variables: {
                    id: task.id,
                },
            });

            if (data.deleteTask) {
                dispatch(deleteTaskAction(task));
                onClose(false);
            }
        } catch (error) {
            toast.error("Something went wrong!");
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row task-modal__header justify-between max-w-full">
            <div
                className={`flex flex-col-reverse lg:flex-row items-start lg:items-center px-[25px] flex-wrap max-w-full ${
                    !isDesigner ? "basis-4/6" : ""
                }`}
            >
                <OviooDropDown
                    options={Object.values(TaskStatus)}
                    onSelected={(status) => handleOnChange("status", status)}
                    initialVal={task.status}
                    className="task-status-dropdown"
                    disabled={isDesigner}
                />

                <TaskTypeDropDown
                    onSelected={(typeId) =>
                        handleOnChange("type", { id: typeId })
                    }
                    initialVal={task.type?.id}
                    disabled={isDesigner}
                />

                {!isDesigner && (
                    <Tooltip title={task?.designer?.fullname}>
                        <Avatar
                            alt={task?.designer?.fullname || "designer"}
                            sx={{ width: 55, height: 55 }}
                            src={task?.designer?.avatar}
                        />
                    </Tooltip>
                )}
            </div>

            {!isDesigner && (
                <div className="basis-2/6 flex justify-end px-[25px] lg:items-center">
                    <IconButton onClick={setOpenDeleteModal}>
                        <MdDelete className="text-red-600 text-4xl" />
                    </IconButton>
                </div>
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    onDeleteBtnClick={onDeleteBtnClick}
                    type="task"
                    title={task.title}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
        </div>
    );
}
