import { updateGithubFile } from "../lib/update-github-file.js";

// Set the file path and file string
// Later, we expect these to be set dynamically through forms
const filePath = "content/content-test.json";
const fileString = `{ "hello world": "some content in git updated from a Vercel function" }`;

// Define the handler
export async function GET(request) {
	// Update the file
	const result = await updateGithubFile(filePath, fileString);
	// Return the update file contents
	return new Response(
		`Hello from Vercel region "${
			process.env.VERCEL_REGION
		}". Result: ${JSON.stringify(result, null, 2)}`
	);
}
