
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function GET(request) {
  const result = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&target=production&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
      method: "get",
    }
  );
  const data = await result.json();

  if (!data.deployments || data.deployments.length === 0) {
    response.status(500).json({
      error: "No deployments found.",
    });
    return;
  }

  // Sort the array of deployment data by the `created` property,
  // so that the latest deployment is the first in the array.
  const sortedDeployments = data.deployments.sort(
    (a, b) => {
      return b.created - a.created;
    }
  );
  // Grab the latest deployment, return data from that deployment
  const latestDeployment = sortedDeployments[0];
  const {
    readyState,
    createdAt: createdAtRaw,
    meta,
    inspectorUrl,
    // ...rest
  } = latestDeployment;
  // The creation date in a human-friendly format
  // If the creation date was less than 4 hours ago,
  // format the date to show it as "X minutes ago".
  // Otherwise, format as a little more human readable.
  const hourCutoff = 4;
  const createdAtDate = new Date(createdAtRaw);
  let createdAt;
  const now = new Date();
  const diffMs = now.getTime() - createdAtDate.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < hourCutoff * 60) {
    const minutes = Math.floor(diffMins);
    createdAt = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    const month = createdAtDate.toLocaleString("default", { month: "short" });
    const day = createdAtDate.getDate();
    // Get time in 24-hour format
    const time = createdAtDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });
    createdAt = `${month} ${day} ${time}`;
  }

  // Commit SHA, first 7 characters
  const commitSha = meta?.githubCommitSha?.substring(0, 7);
  return new Response(
    JSON.stringify({
      readyState,
      createdAt,
      commitSha,
      inspectorUrl,
      // _debug: rest,
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': "application/json"
      }
    }
  )
}
