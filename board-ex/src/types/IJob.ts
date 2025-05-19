export interface IJob {
  url: string,
  company: string,
  title: string,
  location: string,
  description: string,
  applications: number,
  postedDate: string
}

export enum ECanPushJob {
  CANNOT_PUSH_JOB,
  JOB_EXISTING,
  CAN_PUSH_JOB,
}

export enum EJobStatus {
  NONE = "none",
  NOT_APPLIED = "not-applied",
  APPLIED = "applied",
  PASSED = "passed",
  FAILED = "failed"
}

export interface IDBJob extends IJob {
  jobId: string,
  status: EJobStatus,
  prompt: string,
  resumePath: string
}