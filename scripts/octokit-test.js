import { updateGithubFile } from "../lib/update-github-file.js";

// Set the file path and file string
// Later, we expect these to be set dynamically through forms
const filePath = "content/content-test.json";
const fileString = `{ "content": "updated from script in module" }`;

// Update the file
await updateGithubFile(filePath, fileString);
