export async function POST(request) {
       	const formData = await request.formData();
	const parsedFormData = {};
  const fileValue = formData.get("file")
	formData.forEach((value, key) => {
    console.log({ key })
		parsedFormData[key] = value;
	});
  parsedFormData["somefile"] = fileValue

  console.log({ parsedFormData})
}

