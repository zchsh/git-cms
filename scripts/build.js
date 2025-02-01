import fs from "fs"
import path from "path"

const cwd = process.cwd()
const dirSrc = path.join(cwd, "src")
const dirOut = path.join(cwd, "public")

buildHomePage(cwd, dirSrc, dirOut)
buildUploadsPage(cwd, dirSrc, dirOut)

/**
 * HOME PAGE
 */
function buildHomePage(cwd, dirSrc, dirOut) {
  const contentFilePath = "content/content-test.json"
  const contentFile = path.join(cwd, contentFilePath)
  const inputFilePath = path.join(dirSrc, "index.html")
  const outputFilePath = path.join(dirOut, "index.html")
  
  // Read in the input file
  const inputFileString = fs.readFileSync(inputFilePath, "utf-8")
  
  // Read in the content file
  const contentFileString = fs.readFileSync(contentFile, "utf-8")
  
  // Replace `{{CONTENT}}` in the file with stringified content
  const outputFileString = inputFileString.replace("{{CONTENT}}", contentFileString).replace("{{CONTENT_FILE_PATH}}", contentFilePath)
  
  // Write out modified public/index.html
  fs.writeFileSync(outputFilePath, outputFileString)
}

/**
 * UPLOADS PAGE
 */
function buildUploadsPage(cwd, dirSrc, dirOut) {
  const inputFilePath = path.join(dirSrc, "uploads.html")
  const outputFilePath = path.join(dirOut, "uploads.html")
  // Read in the input file
  const inputFileString = fs.readFileSync(inputFilePath, "utf-8")
  // Transform into output
  const outputFileString = inputFileString
  // Write out the output file
  fs.writeFileSync(outputFilePath, outputFileString)
}
