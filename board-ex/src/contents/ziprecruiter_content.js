export const config = {
  matches: ["*://*.ziprecruiter.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    const jobCards = Array.from(
      document.querySelectorAll('div[class*="job_result_two_pane"]')
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
      const title = job.querySelector("h2 > a")

      const detailData = {}
      detailData["url"] = title.href
      detailData["title"] = title.textContent
      title.click()

      setTimeout(function () {
        const jobDescription = document.querySelector(
          'div[data-testid="right-pane"] h2'
        ).nextElementSibling
        detailData["detail"] = jobDescription.textContent

        data.details.push(detailData)
        console.log("**** Job detail added *****", detailData)

        fetchJobDetailsCallback(index + 1)
      }, 3000)
    }

    function fetchJobDetail() {
      title = document.querySelector('div[data-testid="right-pane"] h1')
      detail = document.querySelector(
        'div[data-testid="right-pane"] h2'
      ).nextElementSibling
      url = window.location.href

      sendResponse({
        title: title.textContent,
        detail: detail.textContent,
        url
      })
    }

    fetchJobDetail()
    return true
  }
})
