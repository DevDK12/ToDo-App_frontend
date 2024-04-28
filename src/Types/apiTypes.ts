import { tagType, TaskType } from "./task-types"
import { TUser } from "./user-types"




//_ Response from server api 
export type MesssageResponse = {
    status: string,
    message: string,
}


export type TAccessToken = {
    userId: string,
    access_token: string,
    expiry: string,
}


export type LoginResponse = {
    status : string,
    message : string,
    token : TAccessToken,
}




export type UserResponse = {
    status: string,
    data: {
        user: TUser
    }
}




export interface ErrorResponse {
    status: number,
    data: {
        status: string;
        message: string;
        error?: string;
        stack?: string;
    }
}


export type SingleTaskRequest = {
    taskId: string,
    token: string,
}


export type CreateTaskRequest = {
    token: string,
    task: {
        _id: string,
        msg: string,
        date: Date,
        tags: tagType[],
    }
}
export type UpdateTaskRequest = {
    taskId: string,
    token: string,
    task: {
        msg: string,
        date: Date,
        isFinished: "true" | "false",
        tags: tagType[],

    }
}

export type TasksResponse = {
    status: string,
    data : {
        tasks: TaskType[],
    }
}