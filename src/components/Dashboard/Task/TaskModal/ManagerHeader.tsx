import { TaskInterface, TaskStatus } from "@/interfaces";
import { InputLabel } from "@mui/material";
import OviooDropDown from "../../OviooDropDown";

export const ManagerHeader = ({ task }: { task: TaskInterface }) => (
    <div className="account-manager-row flex flex-col lg:flex-row px-[25px] mb-4">
        <div className="flex items-center">
            <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                className="mr-2 dark:text-white"
            >
                Team name:
            </InputLabel>
            <OviooDropDown
                options={Object.values(TaskStatus)}
                onSelected={() => {}}
                inputLabel={task?.team?.name}
                className="task-status-dropdown"
                disabled={true}
            />
        </div>
        <div className="flex items-center !my-4 mx-0 lg:!my-0 lg:!mx-4">
            <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                className="mr-2 dark:text-white"
            >
                Subscription status:
            </InputLabel>
            <OviooDropDown
                options={Object.values(TaskStatus)}
                onSelected={() => {}}
                inputLabel={task?.team?.subscriptions?.[0]?.status}
                className="task-status-dropdown"
                disabled={true}
            />
        </div>
    </div>
);
