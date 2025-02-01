// Define the handler
export async function GET(request) {
	return new Response(
		`<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  Submitted form data. Redirecting shortly...
  <pre><code>${JSON.stringify({ foo: "bar" }, null, 2)}</code></pre>
  <script type="text/javascript">
    setTimeout(() => {
      window.location.replace('/');
    }, 3000);
  </script>
</body>
</html>`,
		{
			status: 200,
			headers: {
				"Content-Type": "text/html",
			},
		}
	);
}
