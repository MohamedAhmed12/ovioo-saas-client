import { TaskInterface, TaskStatus } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { tasks: Record<TaskStatus, TaskInterface[]> } = {
    tasks: {
        "In queue": [],
        "In progress": [],
        Review: [],
        Done: [],
    },
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            action.payload.forEach((task: TaskInterface) => {
                state.tasks[task.status].push(task);
            });
        },
        resetTasks: (state) => {
            state.tasks = {
                "In queue": [],
                "In progress": [],
                Review: [],
                Done: [],
            };
        },
        pushNewTask: (state, action) => {
            const { status }: { status: TaskStatus } = action.payload;

            state.tasks = {
                ...state.tasks,
                [status]: [...(state.tasks[status] || []), action.payload],
            };
        },
        deleteTask: (state, action) => {
            const { status, id }: { status: TaskStatus; id: string } =
                action.payload;

            state.tasks[status] = state.tasks[status].filter(
                (task: TaskInterface) => task.id != id
            );
        },
        // editTask: (state, action) => {
        //     const {
        //         title,
        //         status,
        //         description,
        //         subtasks,
        //         prevColIndex,
        //         newColIndex,
        //         taskIndex,
        //     } = action.payload;
        //     const column = state.tasks.find(
        //         (col: ColumnInterface, index: number) => index === newColIndex
        //     );

        //     if (column == undefined) return;

        //     let task =
        //         column &&
        //         column.tasks.find(
        //             (task: TaskInterface, index) => index === taskIndex
        //         );

        //     if (task == undefined) return;

        //     task = {
        //         ...task,
        //         title,
        //         status,
        //         description,
        //         subtasks,
        //     };

        //     if (prevColIndex === newColIndex) return;

        //     const newCol = state.columns.find(
        //         (col: ColumnInterface, index: number) => index === newColIndex
        //     );
        //     if (newCol && newCol.tasks && task)
        //         (column.tasks as TaskInterface[]).push(task as TaskInterface);
        // },
        dragTask: (state, action) => {
            if (!state.tasks) return;

            const {
                task,
                oldStatus,
            }: { task: TaskInterface; oldStatus: TaskStatus } = action.payload;

            const taskCurrentIndex: number = state.tasks[oldStatus].findIndex(
                (elm: TaskInterface) => elm.id == task.id
            );

            if (taskCurrentIndex != -1) {
                state.tasks[oldStatus].splice(taskCurrentIndex, 1);
                state.tasks[task.status].push(task);
            }
        },
        setTaskStatus: (state, action) => {
            console.log(action.payload);
        },
    },
});

export const {
    setTasks,
    resetTasks,
    pushNewTask,
    dragTask,
    setTaskStatus,
    deleteTask,
} = boardSlice.actions;
export default boardSlice.reducer;
