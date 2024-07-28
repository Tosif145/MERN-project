import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body:data
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method:"PUT",
        body: data
      })
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        // method: "GET",
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    
    deleteUser: builder.mutation({
      query: (userId) =>({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      })
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        // method: "GET",
      }),
      keepUnusedDataFor: 5
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags:['User']
    }),

    // getMyOrders: builder.query({
    //   query: () => ({
    //     url: `${USERS_URL}/orders`,
    //     // method: "GET",
    //   }),
    //   // providesTags: ['User']
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  // useGetMyOrdersQuery,
} = userApiSlice;