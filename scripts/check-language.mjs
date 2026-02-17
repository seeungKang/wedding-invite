import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const HANGUL_PATTERN = /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/u;

const allowedExtensions = new Set([".ts", ".js"]);

function stripCommentsAndStringsFromCode(code, extension) {
  if (extension === ".css") {
    return code.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  let result = "";
  let index = 0;
  let inSingleLineComment = false;
  let inMultiLineComment = false;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inTemplateLiteral = false;

  while (index < code.length) {
    const current = code[index];
    const next = code[index + 1] ?? "";
    const previous = code[index - 1] ?? "";

    if (inSingleLineComment) {
      if (current === "\n") {
        inSingleLineComment = false;
        result += current;
      }
      index += 1;
      continue;
    }

    if (inMultiLineComment) {
      if (current === "*" && next === "/") {
        inMultiLineComment = false;
        index += 2;
        continue;
      }
      index += 1;
      continue;
    }

    if (!inSingleQuote && !inDoubleQuote && !inTemplateLiteral) {
      if (current === "/" && next === "/") {
        inSingleLineComment = true;
        index += 2;
        continue;
      }

      if (current === "/" && next === "*") {
        inMultiLineComment = true;
        index += 2;
        continue;
      }
    }

    if (!inDoubleQuote && !inTemplateLiteral && current === "'" && previous !== "\\") {
      inSingleQuote = !inSingleQuote;
      result += current;
      index += 1;
      continue;
    } else if (
      !inSingleQuote &&
      !inTemplateLiteral &&
      current === '"' &&
      previous !== "\\"
    ) {
      inDoubleQuote = !inDoubleQuote;
      result += current;
      index += 1;
      continue;
    } else if (
      !inSingleQuote &&
      !inDoubleQuote &&
      current === "`" &&
      previous !== "\\"
    ) {
      inTemplateLiteral = !inTemplateLiteral;
      result += current;
      index += 1;
      continue;
    }

    if (inSingleQuote || inDoubleQuote || inTemplateLiteral) {
      if (current === "\n") {
        result += current;
      }
      index += 1;
      continue;
    }

    result += current;
    index += 1;
  }

  return result;
}

function getFileExtension(filePath) {
  const parts = filePath.split(".");
  return parts.length > 1 ? `.${parts.at(-1)}` : "";
}

function collectFiles(rootDir) {
  const entries = readdirSync(rootDir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(rootDir, entry);
    const entryStats = statSync(fullPath);

    if (entryStats.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }

    const extension = getFileExtension(fullPath);
    if (allowedExtensions.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

const sourceRoot = join(process.cwd(), "src");
const files = collectFiles(sourceRoot);

const violations = [];

for (const filePath of files) {
  const source = readFileSync(filePath, "utf8");
  const extension = getFileExtension(filePath);
  const sourceWithoutComments = stripCommentsAndStringsFromCode(source, extension);
  const relativePath = filePath.replace(`${process.cwd()}\\`, "").replace(/\\/g, "/");

  if (HANGUL_PATTERN.test(sourceWithoutComments)) {
    violations.push(relativePath);
  }
}

if (violations.length > 0) {
  console.error("Language check failed. Hangul is only allowed in comments or string literals.");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Language check passed.");
