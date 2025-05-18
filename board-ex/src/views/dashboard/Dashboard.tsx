import { ProtectedRoute } from "~src/layout/ProtectedRoute"

import Layout from "../../layout/Layout"

const Dashboard = () => {
  const fetchJob = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id !== undefined) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { data: "fetchJobDetails" },
          (response) => {
            if (response) {
              console.log(response)
            }
          }
        )
      }
    })
  }

  return (
    <ProtectedRoute>
      <Layout>
        <button onClick={fetchJob}>Gather the job details!</button>
      </Layout>
    </ProtectedRoute>
  )
}

export default Dashboard
