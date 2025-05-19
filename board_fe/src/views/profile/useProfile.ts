import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProfiles } from "../../store/profile"
import { setBanner, removeBanner} from "../../store/banner"
import axios from "../../axios"

export const useProfile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        dispatch(setBanner())
        const res = await axios.get('/accounts/profile/');
        dispatch(setProfiles(res.data.profiles))
      } catch(error) {
        console.error(error)
      } finally {
        dispatch(removeBanner())
      }
    })()
  }, [])
  return {

  }
}