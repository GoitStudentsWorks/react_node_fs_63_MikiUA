import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://goosetrack-backend-zk53.onrender.com';
const jwt = JSON.parse(localStorage.getItem('token'));

const authenticationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    registration: builder.mutation({
      query: body => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } =
  authenticationApi;
export default authenticationApi;
