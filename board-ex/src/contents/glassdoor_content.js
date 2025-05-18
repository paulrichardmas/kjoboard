export const config = {
  matches: ["*://*.glassdoor.ca/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    const jobWrapper = document.querySelector('ul[aria-label="Jobs List"]')
    if (!jobWrapper) return true
    const jobCards = Array.from(
      jobWrapper.querySelectorAll('div[data-test="job-card-wrapper"]')
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
      const jobLink = jobCards[index].querySelector('a[data-test="job-link"]')
      const jobTitle = jobCards[index].querySelector('a[data-test="job-title"]')

      const detailData = {}
      detailData["url"] = jobLink.href
      detailData["title"] = jobTitle.textContent
      jobLink.click()

      setTimeout(function () {
        const jobDescription = document.querySelector(
          'div[class*="JobDetails_jobDescription"]'
        )
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
