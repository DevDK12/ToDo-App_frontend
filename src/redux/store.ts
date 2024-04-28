import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userSlice } from  "./reducer/user-slice";
import { taskApi } from "./api/taskApi";




export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware,
        taskApi.middleware,
    ),
});



export type RootState = ReturnType<typeof store.getState>;