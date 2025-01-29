// Define the handler
export async function POST(request) {
	const requestBody = request.body;
	return new Response(
		`Submitted form data: ${JSON.stringify({ requestBody }, null, 2)}`,
		{ status: 200 }
	);
}
