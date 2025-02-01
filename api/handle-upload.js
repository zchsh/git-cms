import fs from "fs"
import path from "path"

const cwd = process.cwd();

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
  const imageWritePath = "public/uploads/test.jpg"

  //
  // TODO: upload to GitHub instead of writing to file
  // Maybe make `lib/create-github-file` or something?
  //
  fs.writeFileSync(path.join(cwd, imageWritePath ), imageBuffer)


  // TODO: return something more useful
  return new Response(
    JSON.stringify({ success: true, formData: restFormData, imageName, imageWritePath, imageSize }, null, 2),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
