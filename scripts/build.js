import fs from "fs"
import path from "path"

const contentFile = path.join(process.cwd(), "content", "content-test.json")
const targetFile = path.join(process.cwd(), "public", "index.html")

// Read in the targetFile
const inputFileString = fs.readFileSync(targetFile, "utf-8")

// Read in the content file
const contentFileString = fs.readFileSync(targetFile, "utf-8")

// Replace `{{CONTENT}}` in the file with stringified content
// TODO

// Write out modified public/index.html
// TODO
