export const config = {
  matches: ["https://*.dice.com/*"]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data == "fetchJobDetails") {
    function fetchJobDetail() {
      const title = document.querySelector('h1[data-cy="jobTitle"]')
      const company = document.querySelector('a[data-cy="companyNameLink"]')
      const location = document.querySelector('li[data-cy="location"]')
      const postedDate = document.querySelector('li[data-cy="postedDate"]')
      const description = document.getElementById("jobDescription")
      const url = window.location.href

      sendResponse({
        title: title.textContent,
        company: company.textContent,
        location: location.textContent,
        postedDate: postedDate.textContent,
        description: description.textContent,
        url
      })
    }

    fetchJobDetail()
    return true
  }
})
