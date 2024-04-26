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

