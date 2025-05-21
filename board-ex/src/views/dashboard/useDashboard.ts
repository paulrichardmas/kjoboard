import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "~src/axios"
import { removeBanner, setBanner } from "~src/store/banner"
import { platformsSelector } from "~src/store/platforms"
import {
  profileSelector,
  profilesSelector,
  setProfile,
  setProfiles
} from "~src/store/profile"
import { promptSelector } from "~src/store/prompt"
import type { IDBJob, IJob } from "~src/types/IJob"
import { ECanPushJob, EJobStatus } from "~src/types/IJob"
import { isEmpty } from "~src/utils"

export const useDashboard = () => {
  const dispatch = useDispatch()
  const prompt = useSelector(promptSelector)
  const profiles = useSelector(profilesSelector)
  const profile = useSelector(profileSelector)
  const platform = useSelector(platformsSelector)
  const [jobDetail, setJobDetail] = useState<IJob>()
  const [haveJobStatus, setHaveJobStatus] = useState<ECanPushJob>(
    ECanPushJob.CANNOT_PUSH_JOB
  )
  const [job, setJob] = useState<IDBJob>()

  const canPushJob = useMemo(
    () => ({
      canPush: haveJobStatus != ECanPushJob.CAN_PUSH_JOB,
      existingJob: haveJobStatus == ECanPushJob.JOB_EXISTING,
      canGen: haveJobStatus == ECanPushJob.JOB_EXISTING
    }),
    [haveJobStatus]
  )

  const jobStatus = useMemo(() => (job ? job.status : EJobStatus.NONE), [job])
  const canApplyJob = useMemo(
    () => !(jobStatus == EJobStatus.NOT_APPLIED),
    [jobStatus]
  )

  // Fetch Profile
  useEffect(() => {
    ;(async () => {
      dispatch(setBanner())
      try {
        const res = await axios.get("/accounts/profile/")
        dispatch(setProfiles(res.data.profiles))
        if (isEmpty(profile)) {
          dispatch(setProfile(res.data.profiles[0]))
        }
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(removeBanner())
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!jobDetail || !profile) {
        setHaveJobStatus(ECanPushJob.CANNOT_PUSH_JOB)
        return
      }
      try {
        dispatch(setBanner())
        const res = await axios.post(`/job/check/${profile.profileId}/`, {
          url: jobDetail.url
        })
        console.log(res.data)
        setJob(res.data)
        setHaveJobStatus(ECanPushJob.JOB_EXISTING)
      } catch (error) {
        setHaveJobStatus(ECanPushJob.CAN_PUSH_JOB)
      } finally {
        dispatch(removeBanner())
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
    const selectedProfile = profiles?.find((item) => item.profileId == id)
    if (selectedProfile) {
      dispatch(setProfile(selectedProfile))
    }
  }

  const pushJob = async () => {
    dispatch(setBanner())
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
      dispatch(removeBanner())
    }
  }

  const applyJob = async () => {
    dispatch(setBanner())
    try {
      const res = await axios.post(
        `/job/apply/${profile.profileId}/${job.jobId}/`,
        {
          resumePath: ""
        }
      )
      setJob(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(removeBanner())
    }
  }

  const generatePrompt = async () => {
    dispatch(setBanner())
    try {
      if (!prompt) return
      const res = await axios.get(
        `/job/gen-prompt/${profile.profileId}/${job.jobId}/${prompt.promptId}/`
      )
      setJob(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(removeBanner())
    }
  }

  return {
    job,
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
    applyJob,
    generatePrompt
  }
}
