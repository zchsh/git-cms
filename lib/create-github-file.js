import { Octokit } from "octokit";

// Set the repo owner and name
const repoOwner = "zchsh";
const repoName = "git-cms";

export async function createGithubFile(filePath, fileBuffer) {
  // Set the commit message. Later, this could be set by the user.
  const commitMessage = "chore: test programmatic upload";

  // Set the committer info
  const committer = {
    name: "Zach Shilton",
    email: "4624598+zchsh@users.noreply.github.com",
  };
  // Initialize Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Create the target file
  return await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: repoOwner,
    repo: repoName,
    path: filePath,
    message: commitMessage,
    committer,
    content: fileBuffer.toString("base64"),
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

}
