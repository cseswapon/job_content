import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: () => ({
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
