import React from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetJobsQuery();
  console.log(isLoading);
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      {data?.data.map(({ position, companyName, _id }, i) => (
        <div key={i}>
          <h1>{position}</h1>
          <br />
          <p>{companyName ? companyName : "Nothing Name with our company"}</p>
          <br />
          <button
            onClick={() => navigate(`/job-details/${_id}`)}
            className="bg-slate-500 p-3 text-red-400"
          >
            Details
          </button>
        </div>
      ))}
      {/* <div className='grid grid-cols-2 gap-5 mt-5'>
        <JobCard /> 
      </div>*/}
    </div>
  );
};

export default Jobs;
