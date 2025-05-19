import { fetchJobDetail } from "~src/utils"

export const config = {
  matches: ["*://*.monster.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    sendResponse(fetchJobDetail(request))
    return true
  }
})
