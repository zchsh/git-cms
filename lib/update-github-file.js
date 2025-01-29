import { Octokit } from "octokit";

// Set the repo owner and name
const repoOwner = "zchsh";
const repoName = "git-cms";

export async function updateGithubFile(filePath, fileString) {
	// Set the commit message. Later, this could be set by the user.
	const commitMessage = "chore: test programmatic content update";

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

	// Get the SHA of the file at the specified path
	const existingFile = await octokit.request(
		"GET /repos/{owner}/{repo}/contents/{path}",
		{
			owner: repoOwner,
			repo: repoName,
			path: filePath,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);

	// Encode the file string in base64
	const fileStringEncoded = Buffer.from(fileString).toString("base64");
	const existingFileSha = existingFile.data.sha;

	// Update the target file
	await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
		owner: repoOwner,
		repo: repoName,
		path: filePath,
		message: commitMessage,
		committer,
		content: fileStringEncoded,
		sha: existingFileSha,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
}
