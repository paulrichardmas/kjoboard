import { getPostedDate } from "~src/utils"
import { isEmpty } from "~src/utils"

export const config = {
  matches: ["https://*.dice.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    function fetchJobDetail() {
      console.log(request.body)
      const fields = ["title", "company", "location", "postedDate", "description"]
      const data = {
        url: window.location.href
      }
      for(let field of fields) {
        console.log(field)
        if (!isEmpty(request.body[field]))
        if (request.body[field] == "-") {
          data[field] = ""
        } else {
          if (field == "postedDate") {
            data[field] = getPostedDate(document.querySelector(request.body[field])?.textContent)
          } else {
            data[field] = document.querySelector(request.body[field])?.textContent ?? ""
          }
        }
      }

      sendResponse(data)
    }

    fetchJobDetail()
    return true
  }
})
