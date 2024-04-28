import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskRequest, MesssageResponse, SingleTaskRequest, TasksResponse, UpdateTaskRequest } from "../../Types/apiTypes";
import { server } from "./userApi";



export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/task` }),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        newTask: builder.mutation<MesssageResponse, CreateTaskRequest>({
            query: ({task, token}) => ({
                url: "new",
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                },
                body: task,
            }),
            invalidatesTags: ["tasks"],
        }),
        getAllTasks: builder.query<TasksResponse, string>({
            query: (token) => ({
                url: "all",
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                }
            }),
            providesTags: ["tasks"],
        }),
        deleteTask : builder.mutation<MesssageResponse, SingleTaskRequest>({
            query: ({taskId, token}) => ({
                url: taskId,
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                }
            }),
            invalidatesTags: ["tasks"],
        }),
        updateTask : builder.mutation<MesssageResponse, UpdateTaskRequest>({
            query: ({taskId, token, task}) => ({
                url: taskId,
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                },
                body: task,
            }),
            invalidatesTags: ["tasks"],
        }),

    })

});







export const { useDeleteTaskMutation, useNewTaskMutation, useUpdateTaskMutation, useGetAllTasksQuery } = taskApi;
