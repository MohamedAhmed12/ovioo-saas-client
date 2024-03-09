import DashBoardCard from "@/components/DashBoardCard";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { TaskStatus } from "@/interfaces";
import "@/styles/components/dashboard/task/create-task-backdrop.scss";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/joy";
import { Dialog, FormHelperText, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { FormEvent, useState } from "react";
import TaskTypeDropDown from "../TaskTypeDropDown";

const CREATE_TASK = gql`
    mutation CreateTask($data: CreateTaskDto!) {
        createTask(data: $data) {
            id
            designer {
                id
                fullname
                avatar
            }
            description
            title
            type {
                id
                title
            }
            status
        }
    }
`;

export default function CreateTaskBackdrop({
    open,
    status,
    handleClose,
}: {
    open: boolean;
    status: TaskStatus;
    handleClose: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const { errors, errorHandler } = useGraphError({});
    const [formData, setFormData] = useState({
        title: "",
        type_id: "",
        status:
            Object.values(TaskStatus).find((value) => value === status) ||
            "In queue",
    });

    const { handleOnChange } = useForm(setFormData);

    const [createTask] = useMutation(CREATE_TASK);

    const handlSelectType = (type_id: string) => {
        setFormData((prevState) => ({ ...prevState, type_id }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await createTask({
                variables: {
                    data: formData,
                },
            });

            handleClose();
            errorHandler({});
        } catch (e: any) {
            errorHandler(e);
        }
        setLoading(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                },
                className: "!my-0 !max-h-none w-[80%] md:w-[45%] lg:w-[30%]",
            }}
            className="create-task-backdrop"
        >
            <DashBoardCard
                handleSubmit={handleSubmit}
                headerTitle="Add new Task"
            >
                <div className="flex flex-col items-center">
                    <TaskTypeDropDown onSelected={handlSelectType} />
                    {errors.type_id && (
                        <FormHelperText error className="!-mt-3">
                            {errors.type_id.replace("type_id", "type")}
                        </FormHelperText>
                    )}

                    <TextField
                        className="dashboard-input !w-[80%]"
                        margin="normal"
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleOnChange}
                        autoFocus
                        error={errors.hasOwnProperty("title")}
                    />
                </div>
                <div className="flex justify-end mt-6 justify-center">
                    <span className="w-[80%] flex justify-end">
                        <Button
                            loading={loading}
                            type="submit"
                            className="bg-[--dashboard-primary] text-white "
                        >
                            create
                        </Button>
                    </span>
                </div>
            </DashBoardCard>
        </Dialog>
    );
}
