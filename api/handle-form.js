import { updateGithubFile } from "../lib/update-github-file.js";

// Set the file path and file string
// Later, we expect these to be set dynamically through forms
const filePath = "content/content-test.json";
const fileString = `{ "some-key": "another update from Vercel function" }`;


// Define the handler
export async function POST(request) {
	const formData = await request.formData();
	const parsedFormData = {};
	formData.forEach((value, key) => {
		parsedFormData[key] = value
	})

	const fileString = JSON.stringify(parsedFormData, null, 2);

	// Update the file
	const updateResult = await updateGithubFile(filePath, fileString);

	const debugData = {
		parsedFormData,
		parsedBody: request.body,
		method: request.method,
		url: request.url,
		updateResult
	}
	return new Response(
		`Submitted form data: ${JSON.stringify(
			debugData,
			null,
			2)}.`,
		{ status: 200 }
	);
}

