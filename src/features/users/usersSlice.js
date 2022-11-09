/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: "Users", id: "DataUsers" },
                ...result.ids.map(id => ({ type: "Users", id }))
            ]
        })
    })
});

export const { useGetUsersQuery } = usersApiSlice