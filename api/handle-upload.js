// Define the handler
export async function POST(request) {
  // TODO: figure out how to parse uploaded file out of a form
  const formData = await request.formData();
  let password = ''
  const parsedFormData = {};
  formData.forEach((value, key) => {
    if (key === "password") {
      password = value
    } else {
      parsedFormData[key] = value;
    }
  });

  // Validate that the password is correct
  if (password !== process.env.EDIT_PASSWORD) {
    return new Response(`Unauthorized.`, { status: 401 });
  }

  // TODO: return something more useful
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
