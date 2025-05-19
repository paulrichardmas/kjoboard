import { useSelector } from "react-redux"
import { bannerSelector } from "../../store/banner"

export const useBanner = () => {
  const isLoading = useSelector(bannerSelector)
  return {
    isLoading
  }
}