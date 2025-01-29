// Define the handler
export async function POST(request) {
	const debugData = {
		rawBody: await request.text(),
		parsedBody: request.body,
		parsedFormData: await request.formData(),
		parsedJson: await request.json(),
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
