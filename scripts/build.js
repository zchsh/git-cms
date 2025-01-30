import fs from "fs"
import path from "path"

const contentFile = path.join(process.cwd(), "content", "content-test.json")
const inputFilePath = path.join(process.cwd(), "src", "index.html")
const outputFilePath = path.join(process.cwd(), "public", "index.html")

// Read in the input file
const inputFileString = fs.readFileSync(inputFilePath, "utf-8")

// Read in the content file
const contentFileString = fs.readFileSync(contentFile, "utf-8")

// Replace `{{CONTENT}}` in the file with stringified content
const outputFileString = inputFileString.replace("{{CONTENT}}", contentFileString)

// Write out modified public/index.html
fs.writeFileSync(outputFilePath, outputFileString)
