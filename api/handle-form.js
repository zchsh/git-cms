import multiparty from "multiparty";

// Define the handler
export async function POST(request) {
	const form = new multiparty.Form();
	const formData = await new Promise((resolve, reject) => {
		form.parse(request, function (err, fields, files) {
			if (err) reject({ err });
			resolve({ fields, files });
		});
	});

	console.log(`Submitted form data: ${JSON.stringify(formData, null, 2)}`);

	return new Response("{}", { status: 200 });
}

export const config = {
	api: {
		bodyParser: false,
	},
};
