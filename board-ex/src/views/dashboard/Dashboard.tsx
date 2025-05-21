import Button from "~src/components/Button/Button"
import { ProtectedRoute } from "~src/layout/ProtectedRoute"

import Layout from "../../layout/Layout"
import { useDashboard } from "./useDashboard"

const Dashboard = () => {
  const {
    profiles,
    jobDetail,
    canPushJob,
    jobStatus,
    canApplyJob,
    updateProfile,
    fetchJob,
    pushJob,
    applyJob,
    generatePrompt
  } = useDashboard()

  const onChangeProfile = (event) => {
    updateProfile(event.target.value)
  }

  const formatString = (text: string | undefined) => {
    if (!text) return "---"
    // return text.trim().slice(0, 15) + (text.trim().length > 15 ? "..." : "")
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <div className="mb-2">
            <select className="w-full p-2 mb-2" onChange={onChangeProfile}>
              {profiles?.map((profile) => (
                <option key={profile.profileId} value={profile.profileId}>
                  {profile.name}
                </option>
              ))}
            </select>
            {canPushJob.existingJob && (
              <>
                <p>You have already pushed this JOB!</p>
                <p className="text-red-500">{jobStatus}</p>
              </>
            )}
          </div>
          <Button onClick={fetchJob}>Gather the job details!</Button>

          <table className="w-ful my-2">
            <tbody>
              <tr>
                <td width="50%">
                  <b>Url</b>
                </td>
                <td width="50%">{formatString(jobDetail?.url)}</td>
              </tr>
              <tr>
                <td>
                  <b>Title</b>
                </td>
                <td>{formatString(jobDetail?.company)}</td>
              </tr>
              <tr>
                <td>
                  <b>Company</b>
                </td>
                <td>{formatString(jobDetail?.company)}</td>
              </tr>
              <tr>
                <td>
                  <b>Location</b>
                </td>
                <td>{formatString(jobDetail?.location)}</td>
              </tr>
              <tr>
                <td>
                  <b>Description</b>
                </td>
                <td>{formatString(jobDetail?.description)}</td>
              </tr>
              <tr>
                <td>
                  <b>Applications</b>
                </td>
                <td>{jobDetail?.applications}</td>
              </tr>
              <tr>
                <td>
                  <b>PostedDate</b>
                </td>
                <td>{jobDetail?.postedDate}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-2">
            <Button onClick={pushJob} disabled={canPushJob.canPush}>
              Push to DB
            </Button>

            <Button onClick={generatePrompt} disabled={!canPushJob.existingJob}>
              Prompt
            </Button>

            <Button onClick={applyJob} disabled={canApplyJob}>
              Applied
            </Button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default Dashboard
