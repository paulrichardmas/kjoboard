export const config = {
  matches: ["*://*.monster.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    const jobCards = Array.from(
      document.querySelectorAll('article[data-testid="JobCard"]')
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
      const title = job.querySelector('a[data-testid="jobTitle"]')

      const detailData = {}
      detailData["url"] = title.href
      detailData["title"] = title.textContent
      title.click()

      setTimeout(function () {
        const skills = document.querySelector(
          'div[data-testid="skill-matching-section"] ul'
        )
        detailData["skills"] = Array.from(skills?.children ?? []).map(
          (skill) => skill.textContent
        )
        const jobDescription = document.querySelector(
          'div[data-testid="svx-description-container-inner"]'
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
