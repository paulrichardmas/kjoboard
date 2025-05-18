import { useSelector } from "~node_modules/react-redux/dist/react-redux"
import { bannerSelector } from "~src/store/banner"

export const useBanner = () => {
  const isLoading = useSelector(bannerSelector)
  return {
    isLoading
  }
}