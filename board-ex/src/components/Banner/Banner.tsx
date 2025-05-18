import { ClipLoader } from "~node_modules/react-spinners"

import { useBanner } from "./useBanner"

const Banner = () => {
  const { isLoading } = useBanner()
  return (
    <>
      {isLoading && (
        <div className="w-full fixed top-0 left-0 h-full bg-black/20 text-white text-lg flex justify-center items-center">
          <ClipLoader />
        </div>
      )}
    </>
  )
}

export default Banner
