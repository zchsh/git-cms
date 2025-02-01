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
		updateResult: {
			status: updateResult.status,
		},
	};
	if (updateResult.status === 200) {
		/**
		 * THOUGHT: instead of a simple time-out, could poll Vercel for
		 * build status. Once there are no in-progress builds, then redirect
		 * to the page that was being edited.
		 */
		const editedPageUrl = "/";
		return new Response(
			`<!DOCTYPE html>
<html>
	<head>
		<title>Hello World</title>
	</head>
	<body>
		<p>Submitted form data.</p>
		<pre><code>${JSON.stringify(debugData, null, 2)}</code></pre>
		<p>Go back to the page you were just editing:</p>
		<p><a href="${editedPageUrl}">Go to "${editedPageUrl}"</a></p>
	</body>
</html>`,
			{
				status: 200,
				headers: {
					"Content-Type": "text/html",
				},
			}
		);
	} else {
		return new Response(
			`Issue with update.\n${JSON.stringify(debugData, null, 2)}.`,
			{ status: updateResult.status }
		);
	}
}
