import { useEffect, useState } from "react"

import { useDispatch } from "~node_modules/react-redux/dist/react-redux"
import { Link } from "~node_modules/react-router/dist/development"
import axios from "~src/axios"
import { removeAuthState } from "~src/store/auth"
import { removeBanner, setBanner } from "~src/store/banner"
import { setPlatforms } from "~src/store/platforms"

const Header = () => {
  const [title, setTitle] = useState("Detecting ...")
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(removeAuthState())
  }

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { data: "fetchLocationInfo" },
          (response) => {
            setTitle(response)
            fetchPlatforms(response)
          }
        )
      }
    })
  }, [])

  const fetchPlatforms = async (url) => {
    try {
      dispatch(setBanner())
      const res = await axios.post("/platforms/detail/", {
        platformUrl: `https://${url}`
      })
      dispatch(setPlatforms(res.data))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(removeBanner())
    }
  }

  return (
    <div className="p-1 w-full bg-slate-700 flex justify-between text-white">
      <Link to="/">{title}</Link>
      <Link to="/prompts">Prompts</Link>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Header
