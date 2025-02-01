import { createGithubFile } from "../lib/create-github-file.js";


// Define the handler
export async function POST(request) {
	const formData = await request.formData();
	const parsedFormData = {};
  for (const [key, value] of formData.entries()) {
    let parsedValue;
    if (value instanceof File) {
      parsedValue = value.name;
    } else {
      parsedValue = value;
    }
    parsedFormData[key] = parsedValue
  }

	// Validate that the password is correct
	const { password,  ...restFormData } = parsedFormData;
	if (password !== process.env.EDIT_PASSWORD) {
		return new Response(`Unauthorized.`, { status: 401 });
	}

  // Do something with the image file
  const exampleFile = formData.get('file')
  const imageBuffer = Buffer.from(await exampleFile.arrayBuffer())
  const imageSize = exampleFile.size
  const imageName = exampleFile.name

  // TODO: ensure file name is NOT `index.html`,
  // otherwise we'd overwrite `public/uploads/index.html`.
  const imageWritePath = "public/uploads/" + imageName

  // Upload file to GitHub
  // TODO: handle case where file already exists... maybe we should check
  // on file selection on the front end? And the "Submit" button should
  // be like "Replace file" instead of "Upload file"? With a confirmation
  // dialog or something?
  const result = await createGithubFile(imageWritePath, imageBuffer);

  // TODO: return something more useful
  return new Response(
    JSON.stringify({ status: result.status, formData: restFormData, imageName, imageWritePath, imageSize }, null, 2),
    {
      status: result.status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
