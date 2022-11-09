/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = /*'https://chagest-portfolio.herokuapp.com/api/v1'; */'http://localhost:8000/api/v1';

export const apiSlice = createApi({
    reducerPath: "api",  //optional
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Chagest Data"],
    endpoints: (builder) => ({}),
});
