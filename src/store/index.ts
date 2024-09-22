import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice';
import {useDispatch} from "react-redux";
import {rtkApi} from "../rtkApi/rootApi.ts";

export const store = configureStore({
    reducer: {
        [rtkApi.reducerPath]: rtkApi.reducer,
        auth: authReducer,
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
