import { Octokit } from "octokit";

// Initialize Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

// Set the file path and file string
// Later, we expect these to be set dynamically through forms
const filePath = "content/content-test.json";
const fileString = `{ "content": "update" }`;

// Get the SHA of the file at the specified path
const existingFile = await octokit.request(
	"GET /repos/{owner}/{repo}/contents/{path}",
	{
		owner: "zchsh",
		repo: "git-cms",
		path: filePath,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	}
);

console.log(existingFile);

// Encode the file string in base64
const fileStringEncoded = Buffer.from(fileString).toString("base64");

await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
	owner: "zchsh",
	repo: "git-cms",
	path: filePath,
	message: "chore: test programmatic content update",
	committer: {
		name: "Zach Shilton",
		email: "4624598+zchsh@users.noreply.github.com",
	},
	content: fileStringEncoded,
	sha: "95b966ae1c166bd92f8ae7d1c313e738c731dfc3",
	headers: {
		"X-GitHub-Api-Version": "2022-11-28",
	},
});
