import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlatforms, platformsSelector } from "../../store/platforms"
import { setBanner, removeBanner} from "../../store/banner"
import axios from "../../axios"

export const usePlatforms = () => {
  const dispatch = useDispatch()
  const platforms = useSelector(platformsSelector)
  useEffect(() => {
    (async () => {
      try {
        dispatch(setBanner())
        const res = await axios.get('/platforms/');
        dispatch(setPlatforms(res.data))
      } catch(error) {
        console.error(error)
      } finally {
        dispatch(removeBanner())
      }
    })()
  }, [])

  const createPlatform = async (data) => {
    try {
      dispatch(setBanner())
      const res = await axios.post('/platforms/', {
        ...data,
        url: "-"
      });
      console.log(res.data)
    } catch(error) {
      console.error(error)
    } finally {
      dispatch(removeBanner())
    }
  }

  return {
    platforms,
    createPlatform
  }
}