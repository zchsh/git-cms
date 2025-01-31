import { updateGithubFile } from "../lib/update-github-file.js";

// Set the file path
// Later, we expect this to be set dynamically, for different pages
const filePath = "content/content-test.json";

// Define the handler
export async function POST(request) {
	const formData = await request.formData();
	const parsedFormData = {};
	formData.forEach((value, key) => {
		parsedFormData[key] = value;
	});

	// Validate that the password is correct
	const { password, ...restFormData } = parsedFormData;
	if (password !== process.env.EDIT_PASSWORD) {
		return new Response(`Unauthorized.`, { status: 401 });
	}

	const fileString = JSON.stringify(restFormData, null, 2);

	// Update the file
	const updateResult = await updateGithubFile(filePath, fileString);

	const debugData = {
		formData: restFormData,
		// parsedBody: request.body,
		// method: request.method,
		// url: request.url,
		updateResult,
	};
	return new Response(
		`Submitted form data: ${JSON.stringify(debugData, null, 2)}.`,
		{ status: 200 }
	);
}
