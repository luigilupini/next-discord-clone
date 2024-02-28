import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const projectId = process.env.GITLAB_PROJECT_ID
  const commitCount = 1 // Number of commits you want to fetch
  const privateToken = process.env.GITLAB_API_TOKEN
  const gitUrl = process.env.GITLAB_API_URL
  try {
    const response = await fetch(
      `${gitUrl}/${projectId}/repository/commits?per_page=${commitCount}`,
      {
        headers: {
          ...(privateToken && { "PRIVATE-TOKEN": privateToken }),
        },
      },
    )
    const commits = await response.json()
    return NextResponse.json(commits, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Something went wrong :(" },
      { status: 500 },
    )
  }
}
