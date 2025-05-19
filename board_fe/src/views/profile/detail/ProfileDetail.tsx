import React from "react";
import { ProtectedRoute } from "../../../layout/ProtectedRoute";
import Layout from "../../../layout/Layout";
import { useProfileDetail } from "./useProfileDetail";
import Card from "../../../components/Card/Card";
import JobFilter from "./JobFilter";

const ProfileDetail = () => {
  const { profile, jobs, filterJobs } = useProfileDetail();
  const onFilter = (data) => {
    filterJobs(data);
  };
  return (
    <ProtectedRoute>
      <Layout>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">{profile.name}</p>
            <p className="font-semibold">{profile.title}</p>
          </div>
          <p>{jobs.length} Jobs</p>
        </div>

        <JobFilter onChange={onFilter} />

        <div className="flex flex-col gap-4">
          {jobs?.map((job) => (
            <Card key={job.jobId}>
              <p>{job.company}</p>
              <p>{job.title}</p>
              <a href={job.url} target="_blank">
                {job.url.slice(0, 100)}
              </a>
              <p>
                <span className="px-2 py-1 text-sm rounded-md bg-blue-200">
                  {job.status}
                </span>{" "}
                | {job.appliedDate}
              </p>
            </Card>
          ))}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProfileDetail;
