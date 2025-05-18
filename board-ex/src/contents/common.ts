// import type { PlasmoCSConfig } from "plasmo"

// export const config: PlasmoCSConfig = {
//   matches: ["https://*"]
// }

export {}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data === "fetchLocationInfo") {
    sendResponse(window.location.host)
    return true
  }
})
