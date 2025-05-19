import { useEffect } from "react"
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setBanner, removeBanner } from "../../../store/banner";
import { setProfile, profileSelector } from "../../../store/profile";
import { jobsSelector, setJobs } from "../../../store/job";
import axios from "../../../axios"

export const useProfileDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector)
  const jobs = useSelector(jobsSelector)

  useEffect(() => {
    (async () => {
      dispatch(setBanner());
      try {
        const res = await axios.get(`/accounts/profile/${params.profileId}`);
        dispatch(setProfile(res.data))
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(removeBanner());
      }
    })()
  }, [])

  const filterJobs = async (data = {}) => {
    dispatch(setBanner());
    try {
      const res = await axios.get(`/job/${params.profileId}/`, {
        params: data
      });
      dispatch(setJobs(res.data))
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  };

  useEffect(() => {
    filterJobs()
  }, [])

  return {
    profile,
    jobs,
    filterJobs
  }
}