import { useEffect, useState } from "react"

import { useDispatch } from "~node_modules/react-redux/dist/react-redux"
import { removeAuthState } from "~src/store/auth"

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
          }
        )
      }
    })
  }, [])

  return (
    <div className="p-1 w-full bg-slate-700 flex justify-between text-white">
      <div>{title}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Header
