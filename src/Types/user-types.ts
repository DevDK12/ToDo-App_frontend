import { TAccessToken } from "./apiTypes";

export type TUser = {
    _id: string;
    name: string;
    email: string;
    gender: string;
    role: string;
    dob: string;
};

export interface IUserReducerInitialState {
    user: TUser | null;
    token: TAccessToken | null;
    loading: boolean;
}

export interface ILoginUserApi {
    email: string,
    password: string,
}



export interface IRegisterUserApi extends ILoginUserApi {
    _id: string
    name: string,
    gender: string,
    dob: string,
}





