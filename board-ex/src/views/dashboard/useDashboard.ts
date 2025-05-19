import { useState, useEffect, useMemo } from "react";
import axios from "~src/axios";
import { useDispatch, useSelector } from "react-redux";

import type { IJob, IDBJob } from "~src/types/IJob"
import { ECanPushJob, EJobStatus } from "~src/types/IJob"
import { setProfiles, setProfile } from "~src/store/profile";
import { profilesSelector, profileSelector } from "~src/store/profile";
import { setBanner, removeBanner } from "~src/store/banner";
import { platformsSelector } from "~src/store/platforms";
import { isEmpty } from "~src/utils";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(profilesSelector)
  const profile = useSelector(profileSelector)
  const platform = useSelector(platformsSelector)
  const [jobDetail, setJobDetail] = useState<IJob>()
  const [haveJobStatus, setHaveJobStatus] = useState<ECanPushJob>(ECanPushJob.CANNOT_PUSH_JOB)
  const [job, setJob] = useState<IDBJob>()

  const canPushJob = useMemo(() => ({
    canPush: haveJobStatus != ECanPushJob.CAN_PUSH_JOB,
    existingJob: haveJobStatus == ECanPushJob.JOB_EXISTING
  }), [haveJobStatus])

  const jobStatus = useMemo(() => job ? job.status : EJobStatus.NONE, [job]);
  const canApplyJob = useMemo(() => !(jobStatus == EJobStatus.NOT_APPLIED), [jobStatus])

  // Fetch Profile
  useEffect(() => {
    (async () => {
      dispatch(setBanner());
      try {
        const res = await axios.get('/accounts/profile/');
        dispatch(setProfiles(res.data.profiles))
        if (isEmpty(profile)) {
          dispatch(setProfile(res.data.profiles[0]))
        }
      } catch(error) {
        console.error(error);
      } finally {
        dispatch(removeBanner());
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (!jobDetail || !profile) {
        setHaveJobStatus(ECanPushJob.CANNOT_PUSH_JOB)
        return;
      }
      try {
        dispatch(setBanner());
        const res = await axios.post(`/job/check/${profile.profileId}/`, {
          url: jobDetail.url
        })
        setJob(res.data);
        setHaveJobStatus(ECanPushJob.JOB_EXISTING)
      } catch(error) {
        setHaveJobStatus(ECanPushJob.CAN_PUSH_JOB)
      } finally {
        dispatch(removeBanner());
      }
    })()
  }, [jobDetail, profile])

  const fetchJob = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { data: "fetchJobDetails", body: platform },
          (response) => {
            if (response) {
              setJobDetail(response)
            }
          }
        )
      }
    })
  }

  const updateProfile = (id) => {
    const selectedProfile = profiles?.find(item => item.profileId == id)
    if (selectedProfile) {
      dispatch(setProfile(selectedProfile));
    }
  }

  const pushJob = async () => {
    dispatch(setBanner());
    try {
      const res = await axios.post(`/job/${profile.profileId}/`, {
        url: jobDetail.url,
        company: jobDetail.company,
        title: jobDetail.title,
        location: jobDetail.location,
        description: jobDetail.description,
        applications: jobDetail.applications ?? 0,
        postedDate: jobDetail.postedDate
      })
      setJob(res.data)
      setHaveJobStatus(ECanPushJob.JOB_EXISTING)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(removeBanner());
    }
  };

  const applyJob = async () => {
    dispatch(setBanner());
    try {
      const res = await axios.post(`/job/apply/${profile.profileId}/${job.jobId}/`, {
        resumePath: ""
      })
      setJob(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(removeBanner());
    }
  }

  return {
    profiles,
    profile,
    jobDetail,
    canPushJob,
    jobStatus,
    canApplyJob,
    updateProfile,
    setJobDetail,
    fetchJob,
    pushJob,
    applyJob
  }
};