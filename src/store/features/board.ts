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
        updateTaskTitle(
            state,
            {
                payload: { task, title },
            }: { payload: { task: TaskInterface; title: string } }
        ) {
            state.tasks[task.status].map((task) => {
                if (task.id != task.id) return task;

                task.title = title;
                return task;
            });
        },
    },
});

export const {
    setTasks,
    resetTasks,
    pushNewTask,
    dragTask,
    deleteTask,
    updateTaskTitle,
} = boardSlice.actions;
export default boardSlice.reducer;
