import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobPost: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "job",
        body: data,
      }),
    }),
    getJobs: builder.query({
      query: () => ({
        url: "jobs",
      }),
    }),
    jobById: builder.query({
      query: (id) => ({
        url: `job/${id}`,
      }),
    }),
  }),
});

export const { useJobPostMutation, useGetJobsQuery, useJobByIdQuery } = jobApi;
