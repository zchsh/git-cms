// Define the handler
export async function POST(request) {
	const debugData = {
		// rawBody: await request.text(),
		parsedJson: await request.json(),
		// parsedFormData: await request.formData(),
		parsedBody: request.body,
		method: request.method,
		url: request.url
	}
	return new Response(
		`Submitted form data: ${JSON.stringify(
			debugData,
			null,
			2)}.`,
		{ status: 200 }
	);
}
