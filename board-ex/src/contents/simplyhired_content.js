export const config = {
  matches: ["*://*.simplyhired.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    const jobCards = Array.from(
      document.querySelectorAll('div[data-testid="searchSerpJob"]')
    )

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
      const title = job.querySelector("div > h2 > a")

      const detailData = {}
      detailData["url"] = title.href
      detailData["title"] = title.textContent
      title.click()

      setTimeout(function () {
        const skills = document.querySelectorAll(
          'span[data-testid="viewJobQualificationItem"]'
        )
        detailData["skills"] = Array.from(skills).map(
          (skill) => skill.textContent
        )
        const jobDescription = document.querySelector(
          'h3[data-testid="viewJobDetailsSectionTitle"]'
        )?.nextElementSibling
        detailData["detail"] = jobDescription.textContent

        data.details.push(detailData)
        console.log("**** Job detail added *****", detailData)

        fetchJobDetailsCallback(index + 1)
      }, 3000)
    }

    fetchJobDetailsCallback(0)
    return true
  }
})
