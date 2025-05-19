import { createSlice } from "@reduxjs/toolkit"

import { IJobState } from "../types/IProfile";

const initialState: IJobState = {
  jobs: [],
  job: null
}
 
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs(state, {payload}) {
      state.jobs = payload;
    },
    setJob(state, {payload}) {
      state.job = payload;
    }
  }
})
 
export const { setJobs, setJob } = jobSlice.actions

export const jobsSelector = state => state.job.jobs
export const jobSelector = state => state.job.job

export default jobSlice.reducer