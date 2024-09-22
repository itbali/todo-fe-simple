import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";
import {AuthControllerRegisterApiArg, AuthControllerRegisterApiResponse} from "./todoApi.ts";

export const rtkApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://todos-be.vercel.app',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        authControllerRegister: build.mutation<
            AuthControllerRegisterApiResponse,
            AuthControllerRegisterApiArg
        >({
            query: (queryArg) => ({
                url: `/auth/register`,
                method: "POST",
                body: queryArg.authDto,
            }),
        }),
    }),
});