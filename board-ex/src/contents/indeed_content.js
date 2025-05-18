export const config = {
  matches: ["*://*.indeed.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    const jobCards = Array.from(document.querySelectorAll("td.resultContent"))

    const data = {
      queryLink: window.location.href,
      details: []
    }

    function fetchJobDetailsCallback(index) {
      if (index == jobCards.length) {
        sendResponse(data)
        return
      }
      const job = jobCards[index]
      const title = job.querySelector("h2.jobTitle a")
      // const location = job.querySelector('div[data-testid="text-location"');

      // if (location.textContent == "Remote") {
      const detailData = {}
      title.click() // Click the job link
      detailData["url"] = title.href
      detailData["title"] = title.textContent

      setTimeout(function () {
        const jobDescription = document.getElementById("jobDescriptionText")
        detailData["detail"] = jobDescription.textContent

        data.details.push(detailData)
        console.log("**** Job detail added *****")

        fetchJobDetailsCallback(index + 1)
      }, 3000)
      // }
    }

    function fetchJobDetail() {
      title = document.querySelector('h2[data-testid="simpler-jobTitle"]')
      detail = document.getElementById("jobDescriptionText")
      url = window.location.href

      sendResponse({
        title: title.textContent,
        detail: detail.textContent,
        url
      })
    }

    // fetchJobDetailsCallback(0);
    fetchJobDetail()
    s
    return true
  }
})
