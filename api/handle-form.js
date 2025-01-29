// Define the handler
export async function GET(request) {
	const rawBody = await request.text();
	const parsedBody = request.body;
  const parsedFormData = request.formData
	return new Response(
		`Submitted form data: ${rawBody}. Parsed body: ${JSON.stringify(
			parsedBody,
			null,
			2
		)}. Parsed body: ${JSON.stringify(
			parsedFormData,
			null,
			2
		)}`,
		{ status: 200 }
	);
}
