// Define the handler
export async function POST(request) {
	const debugData = {
		rawBody: await request.text(),
		parsedBody: request.body,
		parsedFormData: request.formData,
		method: request.method,
		url: request.url
	}
	return new Response(
		`Submitted form data: ${rawBody}. Parsed body: ${JSON.stringify(
			debugData,
			null,
			2)}.`,
		{ status: 200 }
	);
}
